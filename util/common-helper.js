const Constant = require('../config/constant');

class CustomFunc {

/**
	* Method: formatJoiError
	* Purpose: Formate array error message to single error string 
	* @param {*} error 
	* @param {*} LangMsg 
	* @response {*} single error string 
	*/
	formatJoiError(error, LangMsg) {
		try {
			let errorType = error.details[0]["type"];
			var msg = "";
			switch (errorType) {
				case "object.unknown":
					if (LangMsg) {
						msg = error.details[0]['context']["label"].toString() + " " + LangMsg.IS_NOT_ALLOWED;
						msg = msg.trim();
					} else {
						msg = error.details[0]['message'].toString();
						msg = msg.trim();
					}
					break;
				case "any.allowOnly":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "any.empty":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "string.empty":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "any.required":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "object.base":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "number.base":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "string.base":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "string.alphanum":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "string.max":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
					msg = msg.trim();
					break;
				case "string.min":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
					msg = msg.trim();
					break;
				case "string.email":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "boolean.base":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg;
					msg = msg.trim();
					break;
				case "number.max":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
					msg = msg.trim();
					break;
				case "number.min":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
					msg = msg.trim();
					break;
				case "array.max":
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString().trim() + " " + msg + " " + error.details[0]['context']["limit"].toString().trim();
					msg = msg.trim();
					break;
				default:
					msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString();
					msg = error.details[0]['context']["label"].toString() + msg;
					msg = msg.trim();
					//  msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString(); msg = msg.substring(2).trim();
					break;
			}
			// msg=msg.replace(msg[0],msg[0].toUpperCase());
			return msg;
		} catch (e) {
			return e.message;
		}
	}

	/**
	* Method: sendSuccess
	* Purpose: resonse formate create 
	* @param {*} res 
	* @param {*} status 
	* @param {*} response 
	* @response {*} http response
	*/
	sendSuccess(res, status, response) {
		res.status(status).json(response)
	}

	/**
	* Method: sendError
	* Purpose: error response formate  
	* @param {*} res 
	* @param {*} status 
	* @param {*} response 
	* @response {*} http response
	*/
	sendError(res, status, message) {
		res.status(status).json(message)
	}


}

module.exports = new CustomFunc();