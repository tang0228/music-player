import ins from "./request";

// 我的消息
export async function getUserEvent() {
    const res = await ins.get('/event');
    return res;
}