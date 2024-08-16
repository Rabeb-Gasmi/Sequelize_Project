
const express =require('express');
const router =express.Router();
const db =require('../models');



router.post('/createProfil',(req,res,next)=>{
    db.Profil.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        country:req.body.country,
        UserId:req.body.UserId

       
    }).then ((response)=>res.status(200).send(response))
      .catch((err)=>res.status(400).send(err))
})



router.get('/profil/:id',(req,res,next)=>{
    db.Profil.findOne({where:{id:req.params.id},include:[db.User]})//njib produit et user illli ketbou
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


router.get('/profils',(req,res,next)=>{
    db.Profil.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

router.patch('/profil/:id',(req,res,next)=>{
    db.Profil.update({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        country:req.body.country,
        UserId:req.body.UserId

    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

router.delete('/profil/:id',(req,res,next)=>{

    db.Profil.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})


module.exports= router;