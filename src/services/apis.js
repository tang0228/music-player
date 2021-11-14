import ins from "./request";

// 搜索
export async function search({keywords = "", type = 1, limit = 20, offset = "0"}) {
    const res = await ins.get("/search", {
        params: {
            keywords,
            type,
            limit,
            offset
        }
    });
    return res;
};

// 邮箱登录
export async function phoneLogin({phone, password}) {
    const res = await ins.get("/login/cellphone", {
        params: {
            phone,
            password
        }
    });
    return res;
};

/**
 * offset, 第二页的话，offset是 1 * limit
 * @param {cat} param0 分类
 * @returns 
 */
export async function getPlaylist({cat = "", limit = 20, offset, order}) {
    const res = await ins.get("/top/playlist", {
        params: {
            cat,
            limit,
            offset,
            order,
        }
    });
    return res;
};

/**
 * 朋友
 * offset, 第二页的话，offset是 1 * limit
 * limit 页容量
 */
export async function getFriend({offset = "0", limit = 20}) {
    const res = await ins.get("/event/list", {
        params: {
            offset, 
            limit
        }
    });
    return res;
};

/**
 * 歌单类型列表
 */
export async function getPlayListCat() {
    const res = await ins.get("/playlist/catlist");
    return res;
}