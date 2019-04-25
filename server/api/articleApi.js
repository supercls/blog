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
// 添加文章接口
router.post('/addArticle', (req, res) => {
    var sql_add = $sql.article.add;
    var params = req.body;
    conn.query(sql_add, [params.title, params.author,params.content,params.type,params.readers,params.likes,params.intro,new Date()], function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return 
            }
            if (!result.affectedRows) {
                res.send(response(false,'添加失败，请联系管理员',result))
            } 
            else {
                res.send(response(true,'添加成功'))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
});
//获取文章接口    pageSize;页数   pageCount 页码  count 条数
router.get('/getArticle',(req,res)=>{
    var sql_get=$sql.article.get;
    var params = req.query || req.params;
    var pageCount = parseInt(params.pageCount || 1);// 页码
    var end = parseInt(params.pageSize || 10); // 默认页数
    var start = (pageCount - 1) * end;
    var count=null
    conn.query('SELECT COUNT(*) FROM article',function(err,result){   //获取总条数
        try{
           if (err) {
                 res.send(response(false,err))
                 return 
            }
            if (!result[0]) {
                res.send(response(true,'暂无数据',result))
            } else {
                count=result[0]
            }     
        }catch(e){
             res.send(response(false,e))   
             return 
        }
    })
    params.type=params.type||''
    sql_get+=` where type= ${params.type} order by createTime desc limit ${start},${end}`
    conn.query(sql_get, function(err, result) {  //链接数据库
        try{
           if (err) {
                 res.send(response(false,err))
                 return  
            }
            if (!result[0]) {
                res.send(response(true,'暂无数据',result))
            } else {
                res.send({
                    isSuccess:true,
                    msg:'获取成功',
                    dtData:result,
                    count:count
                })
            }     
        }catch(e){
               res.send(response(false,e)) 
        }
    })
})
router.get('/articleDetail',(req,res) => {
    var params = req.query || req.params;
    var sql_get=`select * from article where id = ${params.id}`
    conn.query(sql_get, function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return
            }
            if (!result[0]) {
                res.send(response(true,'暂无数据',result))
            }
            else {
               res.send(response(true,'获取成功',result))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
})
//点赞
router.post('/addLikes', (req, res) => {
    var sql_like = $sql.article.addLikes;
    var params = req.body;
    sql_like+=` likes=IFNULL(likes,0)+1 where id=${params.id}`
    conn.query(sql_like, [params.id], function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return 
            }
            if (!result.affectedRows) {
                res.send(response(false,'添加失败，请联系管理员',result))
            } 
            else {
                res.send(response(true,'添加成功'))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
});
//阅读数
router.post('/readers', (req, res) => {
    var sql_read = $sql.article.reader;
    var params = req.body;
    sql_read+=` readers=IFNULL(readers,0)+1 where id=${params.id}`
    conn.query(sql_read, [params.id], function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return
            }
            if (!result.affectedRows) {
                res.send(response(false,'添加失败，请联系管理员',result))
            }
            else {
                res.send(response(true,'添加成功'))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
});
//添加评论
router.post('/addReview', (req, res) => {
    var sql_add = $sql.article.review;
    var sql_read = $sql.article.reader;
    var params = req.body;
    conn.query(sql_add, [params.user,params.userid,params.content,params.articleId,new Date()], function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return 
            }
            if (!result.affectedRows) {
                res.send(response(false,'添加失败，请联系管理员',result))
            } 
            else {
                res.send(response(true,'添加成功'))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
    sql_read+=` reviews=IFNULL(reviews,0)+1 where id=${params.articleId}`
    conn.query(sql_read, function(err, result) {  //链接数据库
       return 
    })
});


//添加回复
router.post('/addCallReview', (req, res) => {
    var sql_add = $sql.article.callreview;
    var params = req.body;
    conn.query(sql_add, [params.user,params.userid,params.parentReviewid,params.content,new Date()], function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return 
            }
            if (!result.affectedRows) {
                res.send(response(false,'添加失败，请联系管理员',result))
            } 
            else {
                res.send(response(true,'添加成功'))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
});

//获取指定文章列表总数评论总数   articleid
router.get('/getRecount',(req,res) => {
    var params = req.query || req.params;
    conn.query(`SELECT COUNT(*) FROM review where articleid = ${params.articleid}`,function(err,result){   //获取总条数
        try{
           if (err) {
                 res.send(response(false,err))
                 return 
            }
            if (!result[0]) {
                res.send(response(true,'暂无数据',result))
            } else {
                res.send(response(true,'获取成功',result[0]['COUNT(*)']))
            }     
        }catch(e){
             res.send(response(false,e))   
             return 
        }
    })
})

//获取评论接口    pageSize;页数   pageCount 页码  articleid 文章id
router.get('/getReviews',(req,res) => {
    var sql_get=$sql.article.getcall;
    var params = req.query || req.params;
    var pageCount = parseInt(params.pageCount || 1);// 页码
    var end = parseInt(params.pageSize || 10); // 默认页数
    var start = (pageCount - 1) * end;
    sql_get+=` where articleid = ${params.articleid} order by createTime desc limit ${start}, ${end}`
    conn.query(sql_get, function(err, result) {  //链接数据库
        try{
            if (err) {
                res.send(response(false,err))
                return
            }
            if (!result[0]) {
                res.send(response(true,'暂无数据',result))
            }
            else {
               res.send(response(true,'获取成功',result))
            }    
        }catch(e){
            res.send(response(false,e))
        }
       
    })
})

module.exports = router;
