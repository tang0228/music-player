import ins from "./request";

// 获取最热主播榜
export async function getDjPopularList({limit}) {
    const res = await ins.get("/dj/toplist/popular", {
        params: {
            limit
        }
    });
    return res;
}