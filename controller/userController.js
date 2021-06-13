const userRequest = require('../request-schema/userRequest');
const CommonHelper = require('../util/common-helper');
const Constant = require('../config/constant');
const UserModel = require('../model/userModel');
const Message = require('../local/message');
const JwtTokenHelper = require("../util/jwtTokenHelper");
const jwtTokenHelper = require('../util/jwtTokenHelper');


class UserController {

    /**
    * Method: signUp
    * Purpose: signUp
    * @param {*} req
    * @param {*} res
    */
    async signUp(req, res) {
      const LangMsg = Message[req.app.get("lang")];
  
      try {
        const input = req.body;
        // for validation
        const { error, value } = userRequest.signUp(LangMsg).validate(input);
        if (error && error.details[0]) {
          return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
        }
        const response = await UserModel.signUp(input).catch((err) => {
          switch (err) {
            case 'EMAIL_EXISTS':
              return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_409_CONFLICT, { 'message': LangMsg.EMAIL_EXIST });
            default:
              return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
          }
        });
  
        if (!response) {
          return;
        }
  
        return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK, { 'message': LangMsg.CREATED })
      } catch (e) {
        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
      }
    }
  
  /**
    * Method: login
    * Purpose: login
    * @param {*} req
    * @param {*} res
    */
   async login(req, res) {
    const LangMsg = Message[req.app.get("lang")];

    try {
      const input = req.body;
      // for validation
      const { error, value } = userRequest.login(LangMsg).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
      }
      const response = await UserModel.login(input).catch((err) => {
        switch (err) {
          case 'EMAIL_NOT_EXISTS':
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': LangMsg.INVALID_EMAIL });
          case 'WRONG_PASSWORD':
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': LangMsg.WRONG_PASSWORD });
          default:
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
        }
      });

      if (!response) {
        return;
      }
      
      const tokens = JwtTokenHelper.generateToken({
        email: response[0].email
      }, Constant.JWT.TOKEN_LIFE, true);
      const data = {
        "accessToken": tokens.accessToken,
        "refreshToken": tokens.refreshToken
      }

      return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK, data)
    } catch (e) {
      return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
    }
  }

    /**
    * Method: userDashboard
    * Purpose: userDashboard
    * @param {*} res
    */
     async userDashboard(req, res) {
      const LangMsg = Message[req.app.get("lang")];
      const tokenUser = req.user;
      try {
        const response = await UserModel.userDashboard(tokenUser.email).catch((err) => {
          if (err == 'NOT_FOUND') {
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_404_NOT_FOUND, { 'message': LangMsg.RECORD_NOT_FOUND });
          } else {
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': err })
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
    * Method: refreshToken
    * Purpose: refreshToken
    * @param {*} res
    */
         async refreshToken(req, res) {
          const LangMsg = Message[req.app.get("lang")];
          try {
            const input = req.body;
            let data = {}
            // for validation
            const { error, value } = userRequest.refreshToken(LangMsg).validate(input);
            if (error && error.details[0]) {
              return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, { 'message': CommonHelper.formatJoiError(error, LangMsg) })
            }

            const response = await jwtTokenHelper.verifyRefreshToken(input.refreshToken).catch((err) => {
              switch (err) {
                case 'INVALID_TOKEN_FOUND':
                  return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED, { 'message': LangMsg.INVALID_TOKEN });
                default:
                  return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { 'message': LangMsg.SOMETHING_WENT_WRONG });
              }
            });
      
            if (!response) {
              return;
            }
            if(response){
              const payLoad = jwtTokenHelper.getJWTPayload(input.refreshToken);
              const tokens = JwtTokenHelper.generateToken({
                email: payLoad.email
              }, Constant.JWT.TOKEN_LIFE, true);
              data = {
                "accessToken": tokens.accessToken,
                "refreshToken": tokens.refreshToken
              }

            }else{
              return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED, { "message": LangMsg.TOKEN_EXPIRED });
            }
           
            return CommonHelper.sendSuccess(res, Constant.STATUS_CODE.HTTP_200_OK,data)
          } catch (e) {
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, e.stack.toString())
          }
        }
  
  }
  
  
  
  module.exports = new UserController();