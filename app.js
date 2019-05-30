const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("formidable");
const morgan =require("morgan");
// 路由模块引入
const post = require("./routers/post.js");
const login = require("./routers/login.js");

var app =  express();
// 2、配置中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())
// 配置开发环境日志,后期将其长久保存到本地
app.use(morgan("dev"));


// 3、拆分路由
app.use("/login",login)
app.use("/post",post);


// 路由划分
app.listen(8080,()=>{
    console.log("running http://127.0.0.1:8080")
})
