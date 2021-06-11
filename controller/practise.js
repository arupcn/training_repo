const practiseRequest = require('../request-schema/practise-request');
const CommonHelper = require('../util/common-helper');
const Constant = require('../config/constant');
const PractiseModel = require('../model/practise');
const Message = require('../local/message');

class PractiseController {
  /**
  * Method: verifyOtp
  * Purpose: Verify otp
  * @param {*} req
  * @param {*} res
  */
  async verifyOtp(req, res) {
    const LangMsg = Message[req.app.get("lang")];

    try {
      const input = req.body;
      // for validation
      const { error, value } = practiseRequest.verifyOtp(LangMsg).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
      }
      const response = await PractiseModel.verifyOtp(input).catch((err) => {
        switch (err) {
          case 'INVALID_OTP':
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': LangMsg.OTP_NOT_VERIFIED });
          default:
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
        }
      });

      if (!response) {
        return;
      }

      return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK, { 'message': LangMsg.OTP_VERIFIED })
    } catch (e) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
    }
  }

  /**
  * Method: mapFunction
  * Purpose: Map function use
  * @param {*} req
  * @param {*} res
  */
   async mapFunction(req, res) {
    const LangMsg = Message[req.app.get("lang")];

    try {
      const input = req.body;
      // for validation
      const { error, value } = practiseRequest.mapFunction(LangMsg).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
      }
      const response = await PractiseModel.mapFunction(input).catch((err) => {
        if (err) {
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
        }
      });

      if (!response) {
        return;
      }

      return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,response)
    } catch (e) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
    }
  }

/**
  * Method: filterFunction
  * Purpose: filterFunction use
  * @param {*} req
  * @param {*} res
  */
 async filterFunction(req, res) {
  const LangMsg = Message[req.app.get("lang")];

  try {
    const input = req.body;
    // for validation
    const { error, value } = practiseRequest.filterFunction(LangMsg).validate(input);
    if (error && error.details[0]) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
    }
    const response = await PractiseModel.filterFunction(input).catch((err) => {
      if (err) {
          return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
      }
    });

    if (!response) {
      return;
    }

    return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,response)
  } catch (e) {
    return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
  }
}

/**
  * Method: fillFunction
  * Purpose: fillFunction use
  * @param {*} req
  * @param {*} res
  */
 async fillFunction(req, res) {
  const LangMsg = Message[req.app.get("lang")];

  try {
    const input = req.body;
    // for validation
    const { error, value } = practiseRequest.fillFunction(LangMsg).validate(input);
    if (error && error.details[0]) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
    }
    const response = await PractiseModel.fillFunction(input).catch((err) => {
      if (err) {
        console.log(err);
          return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
      }
    });

    if (!response) {
      return;
    }

    return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,response)
  } catch (e) {
    return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
  }
}

/**
  * Method: reverseFunction
  * Purpose: reverseFunction use
  * @param {*} req
  * @param {*} res
  */
 async reverseFunction(req, res) {
  const LangMsg = Message[req.app.get("lang")];

  try {
    const input = req.body;
    // for validation
    const { error, value } = practiseRequest.reverseFunction(LangMsg).validate(input);
    if (error && error.details[0]) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
    }
    const response = await PractiseModel.reverseFunction(input).catch((err) => {
      if (err) {
        console.log(err);
          return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
      }
    });

    if (!response) {
      return;
    }

    return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,response)
  } catch (e) {
    return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
  }
}

/**
  * Method: sortFunction
  * Purpose: sortFunction use to sort array
  * @param {*} req
  * @param {*} res
  */
 async sortFunction(req, res) {
  const LangMsg = Message[req.app.get("lang")];

  try {
    const input = req.body;
    // for validation
    const { error, value } = practiseRequest.sortFunction(LangMsg).validate(input);
    if (error && error.details[0]) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
    }
    const response = await PractiseModel.sortFunction(input).catch((err) => {
      if (err) {
        console.log(err);
          return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
      }
    });

    if (!response) {
      return;
    }

    return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,response)
  } catch (e) {
    return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
  }
}

/**
  * Method: splitFunction
  * Purpose: splitFunction use
  * @param {*} req
  * @param {*} res
  */
 async splitFunction(req, res) {
  const LangMsg = Message[req.app.get("lang")];

  try {
    const input = req.body;
    // for validation
    const { error, value } = practiseRequest.splitFunction(LangMsg).validate(input);
    if (error && error.details[0]) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
    }
    const response = await PractiseModel.splitFunction(input).catch((err) => {
      if (err) {
        console.log(err);
          return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
      }
    });

    if (!response) {
      return;
    }

    return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,response)
  } catch (e) {
    return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
  }
}

}



module.exports = new PractiseController();