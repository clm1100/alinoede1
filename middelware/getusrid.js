const authorizationHeader = require('authorization-header');
const jwt = require("jwt-simple");
const secret = 'clm1100';
const getUserIdMiddle=  authorizationHeader(function(err,req,res,next){
    if(!err){
        var token = req.token;
        var userobj  = jwt.decode(token,secret);
        if(userobj){
            req.body.user_id = userobj.id;
            next(); 
        }else{
            res.send({code:1002,message:"token失效了"})
        }
    }else{
        res.send(err.message)
    }
})
module.exports = getUserIdMiddle;