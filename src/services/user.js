import ins from "./request";

// 我的消息
export async function getUserEvent() {
    const res = await ins.get('/event', {
        params: {
            timestamp: Date.now()
        }
    });
    return res;
}

// 分享动态
export async function share({ id, type = 'song', msg }) {
    const res = await ins.post('/share/resource', {
        id, type, msg
    });
    return res;
}

// 删除用户动态
export async function delEvent({ evId }) {
    const res = await ins.get('/event/del', {
        params: {
            evId
        }
    });
    return res;
}