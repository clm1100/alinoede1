const express = require("express");
const router = express.Router();
const jwt = require('jwt-simple');
const secret = 'clm1100';
const db = require("../model/db.js");
const schemaValidate = require('../schemavalidate/index.js');
const {loginSchema,tokenSchema} = schemaValidate;
const AouthorMiddle= require("../middelware/gettoken");

// 登录换取token
router.post("/",(req,res)=>{
    var obj = {...req.body};
    console.log(obj);
    loginSchema.validate(obj).then((value)=>{
        var sql = `select * from users where email='${value.username}' and password=${value.password} and status="activated"`;
        console.log(sql);
        return new Promise((resolve,reject)=>{
            db.query(sql,(err,result)=>{
                if(!err){
                    if(result.length>0){
                        resolve(result)
                    }else{
                        reject({message:"用户不存在"})
                    }
                }else{
                    console.log(err.message);
                    reject(err)
                }
            })
        })
    }).then((result)=>{
       let user = result[0];
       var token = jwt.encode(user,secret);
       res.send(token);
    }).catch((err)=>{
        res.end(err.message)
    })
})


// token换取用户信息;
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

// 测试后端湖区token信息
router.post("/test",AouthorMiddle(),(req,res)=>{
    res.send(req.token);
})


module.exports = router;