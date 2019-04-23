var express = require('express');
var router = express.Router();  
var cheerio = require('cheerio');
var superagent = require('superagent');
router.get('/', function(req, res, next) {
    var params = req.query || req.params;
    superagent.get(`https://cnodejs.org/?page=${params.pageCount}`)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });

});
router.get('/detail', function(req, res, next) {
    var params = req.query || req.params;
    superagent.get(`https://cnodejs.org${params.id}`)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      items.push({
        content: $('#content .topic_content').html(),
      });

      res.send(items);
    });

 });
module.exports = router;
