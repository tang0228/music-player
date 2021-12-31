import axios from "axios";

const ins = axios.create({
    baseURL: "https://music-2903474904-qqcom.vercel.app/",
    withCredentials: true,
    timeout: 6000, // 毫秒
});

ins.interceptors.response.use(res => {
    if(res.status === 200) {
        return Promise.resolve(res.data);
    } else {
        return Promise.reject(res);
    }
}, error => {
    return Promise.reject(error)
})

export default ins;