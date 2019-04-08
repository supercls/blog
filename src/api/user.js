import service from '@/utils/fetch.js'
        // 提交绑定数据
export function saveUser(data) { //fetch  promise用法
    return service({
        url: '/user/SaveUser',
        method: 'post',
        data
    })
}

export function getUser(data) { //fetch  promise用法
    return service({
        url: '/user/SaveUser',
        method: 'get',
        data
    })
}