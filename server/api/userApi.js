var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

var conn = mysql.createConnection(models.mysql);
conn.connect();            //建立数据库连接

var response=function(bolen,msg,data){
    return {
         isSuccess:bolen,
         msg:msg,
         dtData:data||[]
    }
}
// 增加用户接口
router.post('/saveUser', (req, res) => {
    var sql_add = $sql.user.add;
    var params = req.body;
    conn.query(sql_add, [params.name, params.pass, params.sex,new Date()], function(err, result) {  //链接数据库
        if (err) {
            console.log(err);
        }
       if (result.affectedRows === undefined) {
            res.send(response(false,'添加失败，请联系管理员',result))   //查询不出username，data 返回-1
        } else {
           res.send(response(true,'添加成功'))
        }
    })
});


//更新用户信息
router.post('/editorUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    if (params.id) {
        sql_update  += " title = '" + params.title +
                        "',content = '" + params.content +
                        "' where id ='"+ params.id + "'";
    }    
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === undefined) {
            res.send(response(false,'获取失败，请联系管理员',result))
        } else {
           res.send(response(true,'修改成功'))
        }
    })
});

module.exports = router;
