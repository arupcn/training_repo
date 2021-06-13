const Joi = require('@hapi/joi');

class userRequest {
    /**
    * Method: signUp
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
     signUp(LangMsg) {
            return Joi.object().keys({
                firstName: Joi.string().max(50).required()
                .messages({
                    "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO,
                    "any.required": LangMsg.IS_REQUIRED,
                    "string.empty": LangMsg.IS_NOT_ALLOWED_TO_BE_EMPTY
                }),
                lastName: Joi.string().max(50).optional().allow('')
                    .messages({
                        "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO
                    }),
                email: Joi.string().required().max(150)
                    .messages({
                        "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO,
                        "any.required": LangMsg.IS_REQUIRED
                    }),
                password: Joi.string().max(150).optional().allow('')
                    .messages({
                        "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO,
                    }),
                });
        }

     /**
    * Method: login
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
      login(LangMsg) {
        return Joi.object().keys({
            email: Joi.string().required().max(150)
                .messages({
                    "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO,
                    "any.required": LangMsg.IS_REQUIRED
                }),
            password: Joi.string().max(150).optional().allow('')
                .messages({
                    "string.max": LangMsg.MUST_BE_LESS_THAN_OR_EQUAL_TO,
                }),
            });
    }

        /**
    * Method: refreshToken
    * Purpose: JOI validation
    * @param {*} LangMsg 
    */
         refreshToken(LangMsg) {
            return Joi.object().keys({
                refreshToken: Joi.string().required().messages({
                        "any.required": LangMsg.IS_REQUIRED
                    })
                });
        }

}

module.exports = new userRequest();