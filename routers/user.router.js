const express = require("express");
const router = express.Router();
const db = require("../models");


const userController=require('../controllers/user.controller');

router.post("/register", (req, res, next) => {
  userController.reqister(req.body.firstName,req.body.email,req.body.password)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json(err))


})



router.post("/login", (req, res, next) => {
 userController.login(req.body.email, req.body.password)
 .then(token=>res.status(200).json({token:token}))
 .catch(err=>res.status(400).json({err:err}))
});

router.get("/user/:id", (req, res, next) => {
  db.User.findOne({
    where: { id: req.params.id },
    include: [db.Profil, db.Product],
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

router.get("/users", (req, res, next) => {
  db.User.findAll({ include: [db.Profil, db.Product] })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

router.patch("/user/:id", (req, res, next) => {
  db.User.update(
    {
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

router.delete("/user/:id", (req, res, next) => {
  db.User.destroy({ where: { id: req.params.id } })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
