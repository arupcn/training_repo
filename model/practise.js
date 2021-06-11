class PractiseModel {
 /**
 * Method: verifyOtp
 * Purpose: verify otp 
 * @param {*} params
 */
  verifyOtp(params) {
    try {
      return new Promise((resolve, reject) => {
        params = params ? params : {};
        if(params.otp == 123){
            resolve("valid otp");
        }else{
            reject('INVALID_OTP');
        }
      });
    } catch (e) {
      throw e;
    }
  }

 /**
 * Method: mapFunction
 * Purpose: mapFunction 
 * @param {*} params
 */
    mapFunction(params) {
      try {
        return new Promise((resolve, reject) => {
          let arrayIds = params.arrayId.map(item => {
            return (item * 2);
        });
          if(arrayIds != null){
              resolve(arrayIds);
          }else{
              reject(null);
          }
        });
      } catch (e) {
        throw e;
      }
    }

  /**
 * Method: filterFunction
 * Purpose: filterFunction 
 * @param {*} params
 */
   filterFunction(params) {
    try {
      return new Promise((resolve, reject) => {
        let arrayIds = params.arrayId.filter(item => {
          return (item > 3);
      });
        if(arrayIds != null){
            resolve(arrayIds);
        }else{
            reject(null);
        }
      });
    } catch (e) {
      throw e;
    }
  }
  /**
 * Method: fillFunction
 * Purpose: fillFunction 
 * @param {*} params
 */
   fillFunction(params) {
    try {
      return new Promise((resolve, reject) => {
       let array = params.array;
        let newArray = array.fill(params.fillValue, params.startPosition)
        if(newArray != null){
            resolve(newArray);
        }else{
            reject(null);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  /**
 * Method: reverseFunction
 * Purpose: reverseFunction 
 * @param {*} params
 */
   reverseFunction(params) {
    try {
      return new Promise((resolve, reject) => {
       let array = params.array;
        let newArray = array.reverse()
        if(newArray != null){
            resolve(newArray);
        }else{
            reject(null);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  /**
 * Method: sortFunction
 * Purpose: sortFunction 
 * @param {*} params
 */
   sortFunction(params) {
    try {
      return new Promise((resolve, reject) => {
        let array = params.array;
        let newArray = array.sort(function(a, b) {
          return a - b;
        });
        if(newArray != null){
            resolve(newArray);
        }else{
            reject(null);
        }
      });
    } catch (e) {
      throw e;
    }
  }

  /**
 * Method: splitFunction
 * Purpose: splitFunction 
 * @param {*} params
 */
   splitFunction(params) {
    try {
      return new Promise((resolve, reject) => {
        let stringData = params.stringData;
        const newArray = stringData.split();
        if(newArray != null){
            resolve(newArray);
        }else{
            reject(null);
        }
      });
    } catch (e) {
      throw e;
    }
  }

}

module.exports = new PractiseModel();