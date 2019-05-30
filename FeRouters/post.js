const express = require("express");
const router = express.Router();
const db = require("../model/db.js");
const schemavalidate = require("../schemavalidate/index.js");
const {postListSchemal} = schemavalidate;

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
        ORDER BY p.created DESC
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



// 随机获取10条 
// select * from table order by rand() limit 10

module.exports = router