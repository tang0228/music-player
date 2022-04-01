export const SETVOLUMNANDTYPE = Symbol("set-volumn-type");

// 设置音量
export function setVolumnAndTypeAction(obj) {
    return {
        type: SETVOLUMNANDTYPE,
        payload: obj
    }
}
