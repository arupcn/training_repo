const db = require("../models");
const User = db.users;

class UserModel {

  /**
 * Method: signUp
 * Purpose: signUp 
 * @param {*} params
 */
  signUp(params) {
    try {
      return new Promise((resolve, reject) => {
        const newUser = {
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            password: params.password
          };

          // check user is already exist or not
          User.findAll({where:{email:params.email}}).then(data => {
            if(data.length > 0){
              reject('EMAIL_EXISTS');
            }else{

              // create new user
              User.create(newUser).then(data => {
                    resolve(data)
                }).catch(err => {
                    reject(err.message)
            })
            }
          })
      });
    } catch (e) {
      throw e;
    }
  }

  /**
 * Method: login
 * Purpose: login 
 * @param {*} params
 */
   login(params) {
    try {
      return new Promise((resolve, reject) => {

          // check user is already exist or not
          User.findAll({where:{email:params.email}}).then(data => {
            if(data.length < 1){
              reject('EMAIL_NOT_EXISTS');
            }else{

              // login user
              User.findAll({where:{email:params.email,password:params.password}}).then(data => {
                if(data.length < 1)
                {
                  reject('WRONG_PASSWORD')
                }else{
                  resolve(data)
                }
                    
                }).catch(err => {
                    reject(err.message)
            })
            }
          })
      });
    } catch (e) {
      throw e;
    }
  }

 /**
 * Method: userDashboard
 * Purpose: userDashboard 
 */
  userDashboard(email) {
    try {
      return new Promise((resolve, reject) => {
          User.findAll({where:{email:email}}).then(data => {
            if(data.length < 1){
              reject('NOT_FOUND');
            }else{
              resolve(data)
            }
          })
      });
    } catch (e) {
      throw e;
    }
  }

}

module.exports = new UserModel();