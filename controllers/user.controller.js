const joi =require('joi');
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SchemaValidation =joi.object({
    firstName: joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required()
})

exports.reqister=(firstName,email,password)=>{
    return new Promise((resolve,reject)=>{
        let validation=SchemaValidation.validate({firstName,email,password});
        if(validation.error){
            reject(validation.error.details[0].message);
        }
        db.User.count({ where: { email:email } }).then((doc) => {
            if (doc != 0) {
            reject("this email is used !!");
            }
            {
              bcrypt.hash(password, 10).then((hashedPassword) => {
                db.User.create({
                  firstName: firstName,
                  email: email,
                  password: hashedPassword,
                })
                  .then((response) => resolve(response))
                  .catch((err) => reject(err));
                
              });
            }
          });
    })

}

const PrivateKey = "this is a private keyabcdefghijklmnopqrst123456789*//";
exports.login=(email,password)=>{
  return new Promise((resolve,reject)=>{
    db.User.findOne({ where: { email:email } }).then((user) => {
      if (!user) {
        reject("invalid email or password !!");
      } else {
        bcrypt.compare(password, user.password).then((same) => {
          if (same) {
            let token = jwt.sign(
              { id: user.id, firstName: user.firstName },
              PrivateKey,
              {
                expiresIn: "1h"
              }
            );
          resolve(token);
          } else {
            reject("invalid email or password !!");
          }
        });
      }
    });


  })
}