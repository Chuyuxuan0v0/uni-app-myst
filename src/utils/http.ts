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