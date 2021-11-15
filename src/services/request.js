import axios from "axios";

const ins = axios.create({
    baseURL: "",
});

ins.interceptors.response.use(res => {
    if(res.status === 200) {
        return Promise.resolve(res.data);
    } else {
        return Promise.reject(res);
    }
}, error => {
    console.log(error);
})

export default ins;