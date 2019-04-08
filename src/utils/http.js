import service from './fetch';

class Http {
    ajax ({url, data = {}, method= 'get'}) {
        return new Promise((resolve,reject) => {
            this.request( url, resolve, reject, data, method )
        })
    }
    request (url, resolve, reject, data, method) {

        if (method == 'get') {
            service({ 
                url,
                method: method,
                params: data,
            }).then(res => {
                resolve( res )
            }).catch(err => {
                reject( err )
            })
        }else {
            service({ 
                url,
                method: method,
                data,
            }).then(res => {
                resolve( res )
            }).catch(err => {
                reject( err )
            })
        }
      
    } 
}

export default Http