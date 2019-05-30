const authorizationHeader = require('authorization-header');
const AouthorMiddle= function(){
    return authorizationHeader(function(err,req,res,next){
        if(!err){
            next()
        }else{
            res.send(err.message)
        }
    })
}
module.exports = AouthorMiddle;