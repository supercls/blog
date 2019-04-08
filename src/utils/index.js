export function getUrlParam(name) {  //
    if (window.location.href.indexOf('?') >= 0) {
        var a = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var t;
        var i = 0;
        var l = a.length;
        for (; i < l; i++) {
            if ((t = a[i].split('='))[0] === name) return t[1];
        }
    }
    return null;
}
