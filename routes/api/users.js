const express = require('express');
const router = express.Router();
const key = require('../../config/keys');
const registerValidation = require('../../register');
const loginValidation = require('../../login');
const User = require('../../models/User')

router.route('/account/:email').get(function(req,res){
  var loggedInUser = req.params.email;
  User.find({email : loggedInUser  },function(err,products){
      if(err){
          console.log(err);
      } else {
          res.json(products);
      }
  });
});

router.post('/register', (req,res) =>{
  console.log(req.body);
  const {errors , isValid} = registerValidation(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }else{
    User.findOne({email:req.body.email})
    .then(user =>{
      if(user){
        res.status(400).json({email:'Email Already Exists'});
      }else{
        const newUser = new User({
          email : req.body.email,
          name : req.body.name,
          password : req.body.password,
          accountBalance : req.body.accountBalance
        });
        newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err));
      }
    });
  }

});


router.post('/login', (req,res)=>{
  const {erros, isValid} = loginValidation(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }else{
    User.findOne({email : req.body.email})
    .then(user =>{
      if(!user){
        res.status(400).json({email : 'Invalid Email Address'});
      }
      if(user.password.localeCompare(req.body.password)!=0){
        res.status(400).json({password : 'Password is incorrect'});
      }
      res.json({
        success: true,
        email : req.body.email,
        id : user._id
      });
    })
  }
});









module.exports = router;
