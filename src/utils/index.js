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
    }
};

export default utils;