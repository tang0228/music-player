import ins from "./request";

// 获取最热主播榜
export async function getDjPopularList({limit}) {
    const res = await ins.get("/dj/toplist/popular", {
        params: {
            limit
        }
    });
    return res;
};

// 获取dj banner
export async function getDjBanner() {
    const res = await ins.get("/dj/banner");
    return res;
};

// 获取dj 分类
export async function getDjCat() {
    const res = await ins.get("/dj/catelist");
    return res;
};

// dj 推荐
export async function getDjRecommend() {
    const res = await ins.get("/dj/recommend");
    return res;
}

// 节目排行榜
export async function getDjProgramToplist() {
    const res = await ins.get("/dj/program/toplist");
    return res;
}