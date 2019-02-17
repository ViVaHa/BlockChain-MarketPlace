const express = require('express');
const router = express.Router();
const key = require('../../config/keys');
const registerValidation = require('../../register');
const loginValidation = require('../../login');
const Product = require('../../models/Product')
const changeOwnerShip = require('../../changeOwnerShip');
const SOLD = 'sold';



router.route('/list/:email').get(function(req,res){
    var loggedInUser = req.params.email;
    Product.find({ product_posted_by : { $ne: loggedInUser }},function(err,products){
        if(err){
            console.log(err);
        } else {
            res.json(products);
        }
    });
});



router.route('/:id').get(function(req,res){
    let id = req.params.id;
    Product.findById(id,function(err,product){
        res.json(product);
    });
});


router.route('/add').post(function(req,res){
    let product = new Product(req.body);
    console.log(req.body);
    product.save()
        .then(product =>{
            res.status(200).json({'product': 'product added sucessfully '});
        })
        .catch(err =>{
            res.status(400).send('adding new product failed ');
        });
});


router.route('/buy/:id').post(function(req,res){
    Product.findById(req.params.id, function(err,product){
        if(!product)
            res.status(404).send('data is not found');
        else
            product.product_name = req.body.product_name;
            product.product_price = req.body.product_price;
            product.product_status = SOLD
            product.product_posted_by = req.body.new_owner;
            product.product_image = req.body.product_image;
            var new_owner = req.body.new_owner;
            var old_owner = req.body.old_owner;
            var obj = {
              old_owner : req.body.old_owner,
              new_owner : req.body.new_owner,
              cost : req.body.product_price
            }
            changeOwnerShip(obj, function(isValid){
              if(isValid){
                product.save().then(product =>{
                    res.json('Product Bought');
                })
                .catch(err=>{
                    res.status(400).send("update not possible");
                });
              }else{
                res.status(400).send("Insufficient Balance");
              }
            });
          }

    );
});

router.route('/delete/:id').post(function(req,res){
    Product.findById(req.params.id, function(err,product){
        if(!product)
            res.status(404).send('data is not found');
        else
            product.remove({"_id": req.params.id})
            .then(product =>{
                res.json('Product deleted');
            })
            .catch(err=>{
                res.status(400).send("Delete not possible");
            });
    });
});
module.exports = router;
