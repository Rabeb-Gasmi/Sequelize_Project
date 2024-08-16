const express=require('express');
const app=express();
const db=require('./models');

const userRouter=require('./routers/user.router');
const productRouter=require('./routers/product.router');
const profilRouter=require('./routers/profil.router');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/',userRouter);
app.use('/',productRouter);
app.use('/',profilRouter);

app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin',"*");
res.setHeader('Access-Control-Request-Methods',"*");
res.setHeader('Access-Control-Allow-Headers',"*");
res.setHeader('Access-Control-Allow-Methods',"*");
next();

})
db.sequelize.sync().then(()=>{
    app.listen(3000,()=>console.log("server listening in port 3000"));
})
