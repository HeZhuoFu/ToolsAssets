/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '@routes/router';
import { Message, Loading } from 'element-ui';

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    Message.error('用户验证过期，请重新登录！');
    // 清除token
    localStorage.removeItem('eleToken');
    // 跳转到登录页面
    router.push('/login');
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;

        // 404请求不存在
        case 404:
            Message.error('请求的资源不存在');
            break;
        default:
            console.log(other)
            Message.error('网络连接异常，请联系管理员');
    }
}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
    config => {

        if (localStorage.eleToken) {
            // 设置统一的请求header
            config.headers.Authorization = "Bearer " + localStorage.eleToken;
        }

        return config;
    },
    error => {
        errorHandle(error.status, error.response.data);
    })

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
        errorHandle(error.status, error.response.data);
    });

export default instance;