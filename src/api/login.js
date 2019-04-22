import service from '@/utils/fetch.js'
export function login(data) { //fetch  promise用法
    return service({
        url: '/user/loginUser',
        method: 'post',
        data:data
    })
}


/**
 * 上传图片接口
 * @param {String} imageData 图片文件
 * @param {String} suffix 文件后缀
 */
export function uploadJoinMeImage(data) {
    return service({
        url: 'api/User/UploadJoinMeImage',
        method: 'get',
        params: data
    })
}