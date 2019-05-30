const express = require("express");
const router = express.Router();
const db = require("../model/db.js");
const schemavalidate = require("../schemavalidate/index.js");
const {categorySchemal,categoryUpdateSchemal} = schemavalidate;
const getUserIdMiddle = require("../middelware/getusrid.js");

router.get("/list",(req,res)=>{
    let sql = `SELECT * FROM categories`;
    db.query(sql,(err,data)=>{
        if(!err){
            res.send({
                code:200,
                data
            })
        }else{
            res.send({
                code:"999",
                err:err.message
            })
        }
    })
})

router.get("/detail",(req,res)=>{
    id = req.query.id;
    if(!id) return res.send({code:"999",msg:"缺少id"});
    let sql = `SELECT * FROM categories where id = ${id} `;
    db.query(sql,(err,data)=>{
        if(!err){
            res.send({
                code:200,
                data:data[0]
            })
        }else{
            res.send({
                code:"999",
                msg:"查询错误"
            })
        }
    })
})

router.post("/add",getUserIdMiddle,(req,res)=>{
    (async (req,res)=>{
        let {user_id,...obj} = req.body;
        let validateobj =  await categorySchemal.validate(obj);
        let sql = `insert into categories set ?`;
        let dbresult = await new Promise((resolve,reject)=>{
            db.query(sql,validateobj,(err,result)=>{
                console.log("=======");
                console.log(err);
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
        res.send({
            code:200,
            id:dbresult.insertId,
            ...validateobj
        })
    })(req,res).catch(err=>{
        res.send({
            code:"999",
            msg:err.message
        })
    })
})



router.post("/update",getUserIdMiddle,(req,res)=>{
    (async (req,res)=>{
        var {user_id,...obj} = req.body;
        let validateobj =  await categoryUpdateSchemal.validate(obj);
        let sql = `UPDATE categories SET `
        var {id,...obj}=obj
        for(var key in obj){
            sql+=`${key}='${obj[key]}',`
        }
        sql = sql.substr(0,sql.length-1);
        sql+= ` WHERE id = '${id}'`;

        let dbresult = await new Promise((resolve,reject)=>{
            db.query(sql,validateobj,(err,result)=>{
                console.log("=======");
                console.log(err);
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
        res.send({
            code:200,
            id:dbresult.insertId,
            ...validateobj
        })
    })(req,res).catch(err=>{
        res.send({
            code:"999",
            msg:err.message
        })
    })
})


router.post("/del",getUserIdMiddle,(req,res)=>{
    let id = req.body.id;
    if(!id) return res.send({code:"999",msg:"缺少id"});
    let sql = `delete from categories where id = ?`;
    db.query(sql,id,(err,data)=>{
        if(!err){
            res.send({
                code:200,
                data
            })
        }else{
            res.send({
                code:"999",
                err:err.message
            })
        }
    })
})

router.post("/dels",getUserIdMiddle,(req,res)=>{
    let arr = req.body.arr;
    if(!arr) return res.send({code:"999",msg:"缺少id"});
    let sql = `DELETE FROM categories WHERE id in (${arr.join(",")})`
    db.query(sql,(err,data)=>{
        if(!err){
            res.send({
                code:200,
                data
            })
        }else{
            res.send({
                code:"999",
                err:err.message
            })
        }
    })
})





module.exports = router;