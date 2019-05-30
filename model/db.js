const mysql = require('mysql');

const conn  = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'baixiu'
});

module.exports = conn;