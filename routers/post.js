const express = require("express");
const router = express.Router();
const db = require("../model/db.js");
const schemavalidate = require("../schemavalidate/index.js");
const {postListSchemal,postAddSchemal} = schemavalidate;
const getUserIdMiddle = require("../middelware/getusrid.js");

router.get("/list",(req,res)=>{
    (async (req,res)=>{
        let obj = {...req.query};
        let result =await postListSchemal.validate(obj);
        let {currentPage=1,pageSize=10,status="all",categoryId="all"} = result;
        let offset = (currentPage - 1) * pageSize;
        // 接收状态
        var where = `WHERE 1 = 1 `;
        if(status != "all") {
            where += ` AND p.status = '${status}' `;
        }
        if(categoryId != "all") {
            where += ` AND p.category_id = '${categoryId}'`;
        }
        let sql = `
        SELECT p.id,p.title,p.status,p.created,u.nickname,c.name FROM posts p
        LEFT JOIN users u ON u.id = p.user_id
        LEFT JOIN categories c ON c.id = p.category_id ${where}
        LIMIT ${offset},${pageSize}
        `

        let dbresult = await new Promise((resolve,reject)=>{
            db.query(sql,(err,result)=>{
                console.log(result);
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
        res.send(dbresult);

    })(req,res).catch((err)=>{
        res.send(err.message);
    })
})

// 添加文章
router.post("/add",getUserIdMiddle,(req,res)=>{
   ( async (req,res)=>{
        let obj = {...req.body};
        console.log(obj);
        const resvalidate = await postAddSchemal.validate(obj);
        let sql = `INSERT INTO posts SET ?`;
        let dbresult = await new Promise((resolve,reject)=>{
            db.query(sql,resvalidate,(err,result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err);
                }
            })
        })
        res.send({
            code:"200",
            id:dbresult.insertId,
            ...resvalidate
        })
    })(req,res).catch(err=>{
        res.send(err.message);
    })
})

// 根据id获取相应文章

router.get("/detail",(req,res)=>{
    let id = req.query.id;
    if(!id) return res.send({code:"999",msg:"缺少id值"});
    let sql = `SELECT p.title,p.created,p.views,p.likes,p.content,c.name,u.nickname FROM posts p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN users u ON u.id = p.user_id
    WHERE p.id = ${id}`;
    db.query(sql,(err,result)=>{
        if(!err){
            res.send({
                code:200,
                data:result[0]
            })
        }else{
            res.send({
                code:"999",
                msg:"id错误"
            })
        }
    })
})


module.exports = router;