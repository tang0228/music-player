import ins from "./request";

/**
 * 接口统一规范，通过对象的方式传入
 */

// 搜索
export async function search({keywords = "", type = 1, limit = 20, offset = 0}) {
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

// 手机号登录
export async function phoneLogin({phone, password}) {
    const res = await ins.get("/login/cellphone", {
        params: {
            phone,
            password
        }
    });
    return res;
};

// 退出登录
export async function logout() {
    const res = await ins.get("/logout");
    return res;
}

/**
 * offset, 第二页的话，offset是 1 * limit
 * @param {cat} param0 分类
 * @returns 
 */
export async function getPlaylist({cat = "", limit = 20, offset, order = "hot"}) {
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
 * 网友 歌单类型列表
 */
export async function getPlayListCat() {
    const res = await ins.get("/playlist/catlist", );
    return res;
};

// 获取用户信息,传userId
export async function getUserDetail({uid}) {
    const res = await ins.get('/user/detail', {
        params: {
            uid,
        }
    });
    return res;
};

// 可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,
export async function getUserLevel() {
    const res = await ins.get("/user/level", {
        params: {

        }
    });
    return res;
};

// 获取用户的播放记录 type = 1 weekData, type = 2 allData
export async function getUserRecord({uid, type = 1}) {
    const res = await ins.get("/user/record", {
        params: {
            uid,
            type,
        }
    });
    return res;
};

//获取用户歌单
export async function getUserPlayList({uid, offset = 0, limit = 30}) {
    const res = await ins.get("/user/playlist", {
        params: {
            uid,
            limit,
            offset,
        }
    });
    return res;
};

/**
 * gender: 性别 0:保密 1:男性 2:女性
 * birthday: 出生日期,时间戳 unix timestamp
 * nickname: 用户昵称
 * province: 省份id
 * city: 城市id
 * signature：用户签名
 */
export async function updateUserInfo({gender,birthday,nickname, province, city, signature}) {
    const res = await ins.get("/user/update", {
        params: {
            gender,birthday,nickname, province, city, signature
        }
    });
    return res;
};

// 刷新登录
export async function loginRefresh() {
    const res = await ins.get("/login/refresh");
    return res;
};

// 获取用户绑定信息
export async function getUserBindInfo({uid}) {
    const res = await ins.get("/user/binding", {
        params: {
            uid
        }
    });
    return res;
};

// 获取歌曲播放链接
export async function getMusicPlayUrl({id}) {
    const res = await ins.get("/song/url", {
        params: {
            id,
        }
    });
    return res;
};

// 检查歌曲是否可以播放
export async function checkMusic({id}) {
    const res = await ins.get("/check/music", {
        params: {
            id
        }
    });
    return res;
};

// 获取歌单详情
export async function getPlayListDetail({id}) {
    const res = await ins.get("/playlist/detail", {
        params: {
            id
        }
    });
    return res;
};

//  获取热门歌单
export async function getHotPlayList() {
    const res = await ins.get("/playlist/hot");
    return res;
};

// 歌单评论列表
export async function getPlayListCommit({id, limit, offset, before}) {
    const res = await ins.get("/comment/playlist", {
        params: {
            id, limit, offset, before
        }
    });
    return res;
};

// 获取歌曲详情
export async function getSongDetail({ids}) {
    const res = await ins.get("/song/detail", {
        params: { ids }
    });
    return res;
};

// 获取歌词
export async function getLyric({id}) {
    const res = await ins.get("/lyric", {
        params: {
            id
        }
    });
    return res;
};

// 获取相似歌单（包含此歌曲的歌单)
export async function getSimiPlayList({id}) {
    const res = await ins.get("/simi/playlist", {
        params: {
            id
        }
    });
    return res;
};

// 获取相似音乐
export async function getSimiSong({id}) {
    const res = await ins.get("/simi/song", {
        params: {
            id,
        }
    });
    return res;
};

// 获取歌曲评论
export async function getSongComment({id, limit, offset}) {
    const res = await ins.get("/comment/music", {
        params: {
            id, limit, offset
        }
    });
    return res;
}
