import { useMemberStore } from "@/stores";

// 创建请求拦截器
const base = 'https://pcapi-xiaotuxian-front-devtest.itheima.net';

// 拦截器配置
const httpInterceptors = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        // 非http 请求需要拼接地址
        if (!options.url.startsWith('http')) {
            options.url = base + options.url;
        }
        // 设置请求超时的时间 10s
        options.timeout = 10000;

        // 添加小程序请求头
        options.header = {
            ...options.header,
            'source-client': 'miniapp'
        }

        // 添加token

        const memberStore = useMemberStore()
        const token = memberStore.profile?.token

        if (token) {
            options.header = {
                ...options.header,
                Authorization: token,
            }
        }

    }
}

// 请求
uni.addInterceptor('request', httpInterceptors)

// 文件上传
uni.addInterceptor('uploadFile', httpInterceptors)

/*
请求函数
@param UniApp.Requestoptions@returns Promise
亚.返回 Promise 对象
2. 请求成功
2.1 提取核心数据 res.data
2.2 添加类型，支持泛型
3.请求失败
3.1 网络错误 ->提示用户换网络
清理用户信息，跳转到登录页3.2 401错误3.3 其他错误 ->根据后端错误信息轻提示
*/

// T 是自定义泛型
interface Data<T> {
    code: String,
    msg: String,
    result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 请求成功
            success: (res: UniApp.RequestSuccessCallbackResult) => {
                // 通过状态码来判断响应问题
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data as Data<T>) // 类型断言为更加准确的自定义结构类型
                } else if (res.statusCode === 401) {
                    // 清理用户信息，跳转到登录页
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({
                        url: "/pages/login/login"
                    })
                    reject(res)

                } else {
                    // 其他错误，报错提示即可
                    uni.showToast({
                        icon: 'none',
                        title: '请求失败，请稍后重试'
                    })
                    reject(res)
                }
            },
            // 请求失败
            fail: (err: UniApp.GeneralCallbackResult) => {
                uni.showToast({
                    icon: 'none',
                    title: '请求失败，请稍后重试'
                })
                reject(err)
            }
        })
    })
}