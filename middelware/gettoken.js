const authorizationHeader = require('authorization-header');
const AouthorMiddle= function(){
    return authorizationHeader(function(err,req,res,next){
        if(!err){
            next()
        }else{
            res.send({code:1002,msg:"token失效",err:err.message})
        }
    })
}
module.exports = AouthorMiddle;