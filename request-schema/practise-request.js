const Joi = require('@hapi/joi');

class practiseRequest {
    /**
    * Method: verifyOtp
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
         verifyOtp(LangMsg) {
            return Joi.object().keys({
                otp: Joi.number().required()
                    .messages({
                        "any.required": LangMsg.IS_REQUIRED
                    }),
            });
        }
    /**
    * Method: mapFunction
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
     mapFunction(LangMsg) {
        return Joi.object().keys({
            arrayId: Joi.array().items(Joi.number().max(200).required()).optional(),
        });
    }
     /**
    * Method: mapFunction
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
      filterFunction(LangMsg) {
        return Joi.object().keys({
            arrayId: Joi.array().items(Joi.number().max(200).required()).optional(),
        });
    }
    /**
    * Method: fillFunction
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
     fillFunction(LangMsg) {
        return Joi.object().keys({
            array: Joi.array().items(Joi.number().max(200).required()).optional(),
            fillValue: Joi.number().required()
                .messages({
                    "any.required": LangMsg.IS_REQUIRED
                }),
            startPosition: Joi.number().required()
                .messages({
                    "any.required": LangMsg.IS_REQUIRED
                }),
        });
    }

     /**
    * Method: reverseFunction
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
      reverseFunction(LangMsg) {
        return Joi.object().keys({
            array: Joi.array().items(Joi.number().max(200).required()).optional(),
        });
    }
     /**
    * Method: compactFunction
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
      sortFunction(LangMsg) {
        return Joi.object().keys({
            array: Joi.array().items(Joi.any()).optional(),
        });
    }

    /**
    * Method: splitFunction
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
     splitFunction(LangMsg) {
        return Joi.object().keys({
            stringData: Joi.string().max(350).optional().allow('').messages({
                "any.required": LangMsg.IS_REQUIRED,
                "any.string": LangMsg.SHOULD_BE_STRING,
                "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO,
            }),
        });
    }

}

module.exports = new practiseRequest();