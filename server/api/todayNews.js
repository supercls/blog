var express = require('express');
var router = express.Router();  
var cheerio = require('cheerio');
var superagent = require('superagent-charset');
router.get('/', function(req, res, next) {
    var params = req.query || req.params;  //
    superagent.get(`https://segmentfault.com/`)   
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
      res.send(items);
    });

});
router.get('/detail', function(req, res, next) {
    var params = req.query || req.params;
    superagent.get(`https://segmentfault.com/${params.id}`)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text,{decodeEntities: false});
      var items = [];
      items.push({
        content: $('#articleTitle').html(),
      });

      res.send(items);
    });

 });
module.exports = router;
