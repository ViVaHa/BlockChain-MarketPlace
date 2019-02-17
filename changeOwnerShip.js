const User = require('./models/User')
const express = require('express');
const router = express.Router();




module.exports = function changeOwnerShip(data,callback){
  var prev_owner = data.prev_owner;
  var new_owner = data.new_owner;
  var cost = data.cost;
  this.isValid = false;
  User.findOne({email : new_owner})
  .then(user =>{
    if(user.accountBalance<Number.parseInt(cost)){
      //console.log(user.accountBalance,Number.parseInt(cost));
      this.isValid=false;
      callback(this.isValid);
    }else{
      const newOwner = new User({
        _id : user.id,
        email : user.email,
        name : user.name,
        password : user.password,
        accountBalance : user.accountBalance-cost
      });
      var query = { _id : user.id };
      User.findOneAndUpdate(query, { $set: { accountBalance : user.accountBalance-cost }}, function(err,user){
        if(err){
          console.log("Could not deduct");
        }else{
          console.log("Successfully deducted");
        }
      });
      this.isValid=true;
      callback(this.isValid);
    }
  });
};
