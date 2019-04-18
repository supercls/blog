import service from '@/utils/fetch.js'
        // 提交绑定数据
export function saveUser(data) { //注册
    return service({
        url: '/user/SaveUser',
        method: 'post',
        data
    })
}

export function getArticle(data) { //获取文章列表
    return service({
        url: '/article/getArticle',
        method: 'get',
        params:data
    })
}