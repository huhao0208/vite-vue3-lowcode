import axios from 'axios'
import router from "router";
import { ElMessage } from 'element-plus';

function randomFn() {
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
}
const requestId = () => {
    try {
        // 规则 (时间戳 + 手机号后四位(如果没有是随机四位) + 随机四位 + 随机四位)变成16进制
        const num = `${new Date().getTime()}${randomFn()}${randomFn()}${randomFn()}`;
        return BigInt(num).toString(16);
    } catch (error) {
        console.log(error, "sssss");
    }
};

const axiosInstance = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.VITE_BASE_API,
    withCredentials: false,


})

axiosInstance.interceptors.request.use(
    config => {
        const token =     useApp().token;
        console.log(token,'token')
        if (token) {
            config.headers["a_token"] = token;
        }
        config.headers["X-Request-ID"] = requestId();
        config.headers["source"] = "manager";
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    response => {
        console.log(response, 'response')
        if (response?.status === 200 && response?.data?.code===200) {

            return Promise.resolve(response.data)
        } else {
            if (response?.data?.code === 290888){
                router.push('/login');
            }

            ElMessage({
                showClose: true,
                type: 'error',
                duration: 2000,
                message: response.data?.msg || '系统开小差了, 请稍后重试',
            });
            return Promise.reject(response)
        }
    },
    error => {
        if (error?.message?.includes?.('timeout')) {
            console.log('timeout')
        } else {
            console.log(error)
        }
        Promise.reject(error)
    },
)

const request = (url, options) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            url,
            ...options,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}



const post = (url, data, options) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            url,
            method: 'post',
            data,
            ...options,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}
const get = (url,data, options) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            url,
            method: 'get',
            params: data,
            ...options,
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}
export {axiosInstance, request,post,get}
