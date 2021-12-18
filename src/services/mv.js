import ins from "./request";

// 获取 mv 数据
export async function getMvDetail({mvid}) {
    const res = await ins.get("/mv/detail", {
        params: {mvid}
    });
    return res;
};

//获取 mv 点赞转发评论数数据
export async function getMvNumInfo({mvid}) {
    const res = await ins.get("/mv/detail/info", {
        params: {mvid}
    });
    return res;
};

// 获取mv评论
export async function getMvCommit({id, limit, offset, timestamp}) {
    const res = await ins.get("/comment/mv", {
        params: {id, limit, offset, timestamp}
    });
    return res;
};

// 获取推荐MV
export async function getPersonalizedMv() {
    const res = await ins.get("/personalized/mv");
    return res;
}