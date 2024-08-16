const express =require('express');
const router =express.Router();
const db =require('../models');



router.post('/createProduct',(req,res,next)=>{
    db.Product.create({
        name:req.body.name,
        price:req.body.price,
        UserId:req.body.UserId

       
    }).then ((response)=>res.status(200).send(response))
      .catch((err)=>res.status(400).send(err))
})



router.get('/product/:id',(req,res,next)=>{
    db.Product.findOne({where:{id:req.params.id},include:[db.User]})//njib produit et user illli ketbou
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

router.get('/products',(req,res,next)=>{
    db.Product.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

router.patch('/product/:id',(req,res,next)=>{
    db.Product.update({
        name:req.body.name,
        price:req.body.price,
        UserId:req.body.UserId

    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

router.delete('/product/:id',(req,res,next)=>{
    db.Product.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


module.exports= router;