var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
var multer  = require('multer');
var upload = multer({dest: 'upload/'});
var fs= require('fs');

var conn = mysql.createConnection(models.mysql);
conn.connect();            //建立数据库连接

var response=function(bolen,msg,data){
    return {
         isSuccess:bolen,
         msg:msg,
         dtData:data||[]
    }
}
conn.on('close',function(err) {
    if(err) {
        conn = mysql.createConnection(models.mysql);
    } else {
        console.log('conneciton closed normally')
    }
});
router.post('/', upload.any(), function(req, res, next) {
    try{
        var des_file = "./upload/" + req.files[0].originalname;
        fs.readFile( req.files[0].path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                if( err ){
                    res.send(response(false,err))
                    return false
                }else{
                    res.send({
                        isSuccess:true,
                        msg:'File uploaded successfully',
                        dtData:req.files[0].originalname
                    })
                    return false
                }
            });
        });
    }catch(e){

    }

 });

module.exports = router;
