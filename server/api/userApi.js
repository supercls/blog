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
conn.on('close',function(err) {
    if(err) {
        conn = mysql.createConnection(models.mysql);
    } else {
        console.log('conneciton closed normally')
    }
});
// 增加用户接口  不允许添加重复用户名用户
router.post('/saveUser', (req, res) => {
    var sql_add = $sql.user.add;
    var sql_name=$sql.user.select_name;
    var params = req.body;
    sql_name+=` where name =${params.name}`;
    conn.query(sql_name,params.name,function(err,result){
        try{
            if (err) {
                res.send(response(false,err))
                return 
            }
            if(result[0]){
                res.send(response(false,'该用户已存在或占用'))
            }
            else{
                 conn.query(sql_add, [params.name, params.pass, params.sex,new Date()], function(err, result) {  //链接数据库
                    if (err) {
                        console.log(err);
                        res.send(response(false,'获取失败，请联系管理员',err))
                    }
                    if (result.affectedRows === undefined) {
                        res.send(response(false,'添加失败，请联系管理员',result)) 
                    } else {
                       res.send(response(true,'添加成功'))
                    }
                })
            }    
        }catch(e){
             res.send(response(false,e))
        }
        
    }) 
   
});

//登录用户信息
router.post('/loginUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    var params = req.body;   
    sql_name+=` where name =${params.name}`
    conn.query(sql_name, params.name, function(err, result) {
        try{
            if (err) {
                res.send(response(false,err))
                return 
            }
            if(!result[0]){
                res.send(response(false,'未找到该用户或该用户不存在',result))
            }
            else{
                if(result[0].pass != params.pass){ 
                   res.send(response(false,'密码输入错误'))     
                }
                else{
                    res.send(response(true,'获取成功',result))
                }
            }    
        }catch(e){
            res.send(response(false,err))    
        }
        
    })
});
 
//更新用户信息
router.post('/editorUser', (req, res) => {
    var sql_update = $sql.user.update_user;
    var params = req.body;
    if (params.id) {
        sql_update  += " name = '" + params.name +
                        "',content = '" + params.pass +
                        "' where id ='"+ params.id + "'";
    }    
    conn.query(sql_update, params.id, function(err, result) {
        if (err) {
            console.log(err);
            res.send(response(false,'获取失败，请联系管理员',err))
        }
        if (result.affectedRows === undefined) {
            res.send(response(false,'获取失败，请联系管理员',result))
        } else {
           res.send(response(true,'修改成功'))
        }
    })
});

module.exports = router;
