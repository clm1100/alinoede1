const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("formidable");
const morgan =require("morgan");

// 路由模块引入
const post = 


var express = express();
var app =  express();

// 2、配置中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())


// 3、拆分路由


// 路由划分
app.listen(8080,()=>{
    console.log("running http://127.0.0.1:8080")
})
