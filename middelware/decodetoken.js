const jwt = require('jwt-simple');
const secret = 'clm1100';
const authorizationHeader = require('authorization-header');

var decodetoken = function(req,res,next){
    var token = req.headers;
    token = token.split
}