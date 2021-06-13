const Constant = require('../config/constant');
const Message = require('../local/message');
const CommonHelper = require('../util/common-helper');
const JwtHelper = require('../util/jwtTokenHelper');

Authorize = (req, res, next) => {
    try {
        const lang = req.headers.lang ? req.headers.lang : req.app.get("lang");
        req.app.set("lang", lang)
        const LangMsg = Message[req.app.get("lang")];
        /**
         * Authenticate user using Jwt token auth mechanism 
         */
        const accessToken = req.headers['access_token'] ? req.headers['access_token'] : (req.headers['access-token'] ? req.headers['access-token'] : '');
        req.headers['access_token'] = accessToken;
        if (!accessToken) {
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED, { "message": LangMsg.FAILED_TO_AUTHENTICATE });
        } else {
            JwtHelper.verify(accessToken).then((decode) => {
                req.user = decode;
                return next();
            }).catch((err) => {
                switch (err.name) {
                    case 'JsonWebTokenError':
                        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED, { "message": LangMsg.TOKEN_EXPIRED });
                    default:
                        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, {
                            "message":
                                LangMsg.SOMETHING_WENT_WRONG
                        });
                }
            })
        }
    } catch (e) {
        return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, { "message": e.stack.toString() });
    }
}



module.exports = {
    Authorize
}