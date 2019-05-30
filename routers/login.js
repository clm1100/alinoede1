const express = require("express");
const router = express.Router();
const Joi = require('@hapi/joi');
const jwt = require('jwt-simple');
const secret = 'clm1100';
const authorizationHeader = require('authorization-header');

const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
})

const tokenSchema = Joi.object().keys({
    token: [Joi.string(), Joi.number()],
})


const AouthorMiddle= function(){
    return authorizationHeader(function(err,req,res,next){
        if(!err){
            next()
        }else{
            res.send(err.message)
        }
    })
}

router.post("/",(req,res)=>{
    var obj = {...req.body};
    loginSchema.validate(obj,(err,value)=>{
        if(!err){
            let token = jwt.encode(value,secret)
            res.send(token);
        }else{
            res.send({"code":"999",msg:err.message})
        }
    })
})

router.post("/token",(req,res)=>{
    let obj = {...req.body};
    tokenSchema.validate(obj,(err,value)=>{
        if(!err){
            var user = jwt.decode(value.token,secret);
            res.send(user)
        }else{
            res.send({
                code:"999",
                msg:"token错误"
            })
        }
    })
})
router.post("/test",AouthorMiddle(),(req,res)=>{
    res.send(req.token);
})


module.exports = router;