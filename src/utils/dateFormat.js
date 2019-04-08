export function parseTime(time, cFormat) {
   if (arguments.length === 0 || !time) {
     return '';
   }
   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
   let date;
   if (typeof time === 'object') {
     date = time
   } else {
     if (('' + time).length === 10) time = parseInt(time) * 1000
     date = new Date(time)
   }
   const formatObj = {
     y: date.getFullYear(),
     m: date.getMonth() + 1,
     d: date.getDate(),
     h: date.getHours(),
     i: date.getMinutes(),
     s: date.getSeconds(),
     a: date.getDay()
   }
   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
     let value = formatObj[key];
     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
     if (result.length > 0 && value < 10) {
       value = '0' + value
     }
     return value || 0
   });
   return time_str
 }

 export function formatTime(time, option) {
   time = +time * 1000;
   const d = new Date(time);
   const now = Date.now();

   const diff = (now - d) / 1000;

   if (diff < 30) {
     return '刚刚'
   } else if (diff < 3600) { // less 1 hour
     return Math.ceil(diff / 60) + '分钟前'
   } else if (diff < 3600 * 24) {
     return Math.ceil(diff / 3600) + '小时前'
   } else if (diff < 3600 * 24 * 2) {
     return '1天前';
   }
   if (option) {
     return parseTime(time, option);
   } else {
     return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
   }
 }


export function  dateFunction(fmt,date){
    /**************************************时间格式化处理 console.log(dateFunction("yyyy-MM-dd hh:mm:ss",new Date()))************************************/
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

export function getAge(beginStr, endStr) {  //算年龄  精确到小时
    var reg = new RegExp(
        /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
    var beginArr = beginStr.match(reg);
    var endArr = endStr.match(reg);

    var days = 0;
    var month = 0;
    var year = 0;
    days = endArr[4] - beginArr[4];
    if (days < 0) {
        month = -1;
        days = 30 + days;
    }
    month = month + (endArr[3] - beginArr[3]);
    if (month < 0) {
        year = -1;
        month = 12 + month;
    }
    year = year + (endArr[1] - beginArr[1]);
    var yearString = year > 0 ? year + "岁" : "";
    var mnthString = month > 0 ? month + "个月" : "";
    var dayString = days > 0 ? days + "天" : "";

    /*
     * 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0
天小于3天 取小时
     * 例如出生2天 就取 48小时
     */
    var result = "";
    if (year >= 1) {
        result = yearString + mnthString;
    } else {
        if (month >= 1) {
            result = days > 0 ? mnthString + dayString : mnthString;
        } else {
            var begDate = new Date(beginArr[1], beginArr[3] - 1,
                beginArr[4], beginArr[6], beginArr[8], beginArr[10]);
            var endDate = new Date(endArr[1], endArr[3] - 1, endArr[4],
                endArr[6], endArr[8], endArr[10]);

            var between = (endDate.getTime() - begDate.getTime()) / 1000;
            days = Math.floor(between / (24 * 3600));
            var hours = Math.floor(between / 3600 - (days * 24));
            var dayString = days > 0 ? days + "天" : "";
            result = days >= 3 ? dayString : days * 24+hours+'小时'
        }
    }

    return result;
}