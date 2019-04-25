var express = require('express');
var router = express.Router();  
var cheerio = require('cheerio');
var superagent = require('superagent-charset');
var response=function(bolen,msg,data){
    return {
        isSuccess:bolen,
        msg:msg,
        dtData:data||[]
    }
}
router.get('/', function(req, res, next) {
    try{
        var params = req.query || req.params;  //
        superagent.get(`https://segmentfault.com/channel/frontend`)
            .end(function (err, sres) {
                if (err) {
                    return next(err);
                }
                var $ = cheerio.load(sres.text,{decodeEntities: false});
                var items = [];
                $('.news-list  .news-item ').each(function (idx, element) {
                    var $element = $(element);
                    items.push({
                        title: $element.find('.news__item-title').html(),
                        content:$element.find('.article-excerpt').html(),
                        time:$element.find('.author').text(),
                        href:$element.find('.news__item-info').children('a').attr('href')
                    });
                });
                res.send(response(true,'爬取成功',items))
            });
    }catch (e) {
        res.send(response(false,e))
    }
});
router.get('/detail', function(req, res, next) {
    try{
        var params = req.query || req.params;
        superagent.get(`https://segmentfault.com${params.id}`)
            .end(function (err, sres) {
                if (err) {
                    return next(err);
                }
                var $ = cheerio.load(sres.text,{decodeEntities: false});
                var items = [];
                items.push({
                    title: $('#articleTitle').find('a').html(),
                    from:'爬于知名网站https://segmentfault.com',
                    headercenter:$('.post-topheader__info').find('.content__tech').children('span').html(),
                    content:$('.article__content').html()
                });
                res.send(response(true,'爬取成功',items))
            });
    }catch (e) {
        res.send(response(false,e))
    }
 });
module.exports = router;
