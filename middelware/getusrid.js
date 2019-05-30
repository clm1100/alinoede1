const authorizationHeader = require('authorization-header');
const jwt = require("jwt-simple");
const secret = 'clm1100';
const getUserIdMiddle=  authorizationHeader(function(err,req,res,next){
    if(!err){
        var token = req.token;
        console.log(token);
        var userobj  = jwt.decode(token,secret);
        console.log("=====",userobj,"===========");
        if(userobj){
            req.body.user_id = userobj.id;
            next(); 
        }else{
            res.send({message:"token失效了"})
        }
    }else{
        res.send(err.message)
    }
})
module.exports = getUserIdMiddle;