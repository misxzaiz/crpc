export const MAIN_URI = "http://127.0.0.1:8000/server/dealMethod"
// export const MAIN_URI = "https://dominant-ant-formerly.ngrok-free.app"

export const deal = (uri, data) => {
    return dealWithToken(uri, data, uni.getStorageSync('token'))
}
export const dealMethodApi = (dealMethodPo) => {
    return uni.request({
        url: `${MAIN_URI}`,
        method: 'POST',
        data: dealMethodPo,
    });
};
export const dealWithToken = (uri, data, token) => {
    const requestVo = getRequestVo(uri, data, token);
    return uni.request({
        url: `${MAIN_URI}`,
        method: 'POST',
        data: requestVo,
    }).then(response => {
        // 在这里处理响应结果
        if (response.data.code === 401) {
            // 执行跳转到登录页面的操作
            uni.navigateTo({
                url: '/pages/auth/login', // 登录页面的路径
            }).then(r => {});
            // 返回一个 reject 状态的 Promise，表示请求被中止
            return Promise.reject('Unauthorized');
        } else {
            return response;
        }
    })
}

export function getRequestVo(uri, data, token) {
    const uris = uri.split("/");
    return {
        serverName: uris[0],
        name: uris[0],
        className: uris[1],
        data: data,
        methodName: uris[2],
        version: uris[3],
        token: token
    }
}