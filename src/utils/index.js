import Cookie from "js-cookie";

const utils = {
    /**
     * 判断一个数是否是偶数
     */
    isEven(num) {
        return (num % 2) === 0
    },
    /**
     * 不足10补0
     */
    paddingLeft(num) {
        return num < 10 ? "0" + num : num;
    },
    /**
     * 给定毫秒数，转换为时分秒
     */
    formatTime(mss) {
        var h = parseInt((mss / (1000 * 60 * 60)) % 60);
        var m = parseInt((mss / (1000 * 60)) % 60);
        var s = parseInt((mss / 1000) % 60);
        return `${h > 0 ? this.paddingLeft(h) + ':' : ''}${m > 0 ? this.paddingLeft(m) + ':' : ""}${s > 0 ? this.paddingLeft(s) + '' : ""}`;
    },
    // 对象数组去重
    unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
    },
    // 根据type，得到文本类型
    getTextByType(type) {
        switch (type) {
            case "1":
              return "单曲";
            case "100":
                return "歌手";
            case "10":
                return "专辑";
            case "1014":
                return "视频";
            case "1006":
                return "歌词";
            case "1000":
                return "歌单";
            case "1009":
                return "声音主播";
            case "1002":
                return "用户";
            default:
              break;
          }
    },
    // 设置cookie
    setCookie(key, value) {
        Cookie.set(key, value);
    },
    // 获取cookie
    getCookie(key) {
        return Cookie.get(key);
    }
};

export default utils;