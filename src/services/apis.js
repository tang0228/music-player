import ins from "./request";

/**
 * 接口统一规范，通过对象的方式传入
 */

// 搜索
export async function search({ keywords = "", type = 1, limit = 20, offset = 0 }) {
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
export async function phoneLogin({ phone, password }) {
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
export async function getPlaylist({ cat = "", limit = 20, offset, order = "hot" }) {
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
export async function getFriend({ offset = "0", limit = 20 }) {
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
    const res = await ins.get("/playlist/catlist",);
    return res;
};

// 获取用户信息,传userId
export async function getUserDetail({ uid, timestamp = Date.now() }) {
    const res = await ins.get('/user/detail', {
        params: {
            uid,
            timestamp,
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
export async function getUserRecord({ uid, type = 1 }) {
    const res = await ins.get("/user/record", {
        params: {
            uid,
            type,
        }
    });
    return res;
};

//获取用户歌单
export async function getUserPlayList({ uid, offset = 0, limit = 30 }) {
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
export async function updateUserInfo({ gender, birthday, nickname, province, city, signature }) {
    const res = await ins.get("/user/update", {
        params: {
            gender, birthday, nickname, province, city, signature
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
export async function getUserBindInfo({ uid }) {
    const res = await ins.get("/user/binding", {
        params: {
            uid
        }
    });
    return res;
};

// 获取歌曲播放链接
export async function getMusicPlayUrl({ id }) {
    // const res = await ins.get("/song/url", {
    //     params: {
    //         id: id + '.mp3',
    //     }
    // });
    const res = await getSongDetail({ ids: id });
    let song;
    if (res.code === 200) {
        song = res.songs[0];
    }

    let url = "https://music.163.com/song/media/outer/url?id="
    return { code: 200, data: [{ id, url: `${url}${id}.mp3`, song }] };
};

// 获取歌曲下载url
export async function getSongUrl({ id }) {
    const res = await ins.get("/song/download/url", {
        params: { id }
    });
    return res;
}

// 检查歌曲是否可以播放
export async function checkMusic({ id }) {
    const res = await ins.get("/check/music", {
        params: {
            id
        }
    });
    return res;
};

// 获取歌单详情
export async function getPlayListDetail({ id }) {
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
export async function getPlayListCommit({ id, limit, offset, timestamp }) {
    const res = await ins.get("/comment/playlist", {
        params: {
            id, limit, offset, timestamp
        }
    });
    return res;
};

// 获取歌曲详情
export async function getSongDetail({ ids }) {
    const res = await ins.get("/song/detail", {
        params: { ids }
    });
    return res;
};

// 获取歌词
export async function getLyric({ id }) {
    const res = await ins.get("/lyric", {
        params: {
            id
        }
    });
    return res;
};

// 获取相似歌单（包含此歌曲的歌单)
export async function getSimiPlayList({ id }) {
    const res = await ins.get("/simi/playlist", {
        params: {
            id
        }
    });
    return res;
};

// 获取相似音乐
export async function getSimiSong({ id }) {
    const res = await ins.get("/simi/song", {
        params: {
            id,
        }
    });
    return res;
};

// 获取歌曲评论
export async function getSongComment({ id, limit, offset, timestamp }) {
    const res = await ins.get("/comment/music", {
        params: {
            id, limit, offset, timestamp
        }
    });
    return res;
};

// 获取歌手详情
export async function getArtistDetail({ id }) {
    const res = await ins.get("/artist/detail", {
        params: {
            id,
        }
    });
    return res;
};

// 获取相似歌手
export async function getSimiArtist({ id }) {
    const res = await ins.get("/simi/artist", {
        params: {
            id,
        }
    });
    return res;
};

// 获取歌手热门作品已经歌手部分信息
export async function getArtistSongs({ id }) {
    const res = await ins.get("/artists", {
        params: { id }
    });
    return res;
};

// 获取歌手专辑
export async function getArtistAlbums({ id, limit, offset }) {
    const res = await ins.get("/artist/album", {
        params: { id, limit, offset }
    });
    return res;
};

// 获取歌手mv
export async function getArtistMv({ id, limit, offset }) {
    const res = await ins.get("/artist/mv", {
        params: {
            id, limit, offset
        }
    });
    return res;
};

// 获取歌手描述
export async function getArtistDesc({ id }) {
    const res = await ins.get("/artist/desc", {
        params: { id }
    });
    return res;
};

// 获取专辑内容
export async function getAlbum({ id }) {
    const res = await ins.get("/album", {
        params: { id }
    });
    return res;
};

// 获取专辑评论
export async function getAlbumCommit({ id, limit, offset, timestamp }) {
    const res = await ins.get("/comment/album", {
        params: { id, limit, offset, timestamp }
    });
    return res;
};

// 
export async function getAlbumDynamic({ id }) {
    const res = await ins.get("/album/detail/dynamic", {
        params: { id }
    });
    return res;
};

// 获取banner数据
export async function getBanner() {
    const res = await ins.get("/banner");
    return res;
};

// 获取推荐歌单
export async function getPersonalized({ limit }) {
    const res = await ins.get("/personalized", {
        params: { limit }
    });
    return res;
}

// 获取每日推荐歌单
export async function getDayPlsyList() {
    const res = await ins.get("/recommend/resource");
    return res;
};

// 获取首页新碟上架数据
export async function getAlbumNewest() {
    const res = await ins.get("/album/newest");
    return res;
};

// 签到
export async function userSignIn({ type }) {
    const res = await ins.get("/daily_signin", {
        params: {
            type
        }
    });
    return res;
};

// 获取榜单内容摘要
export async function getTop() {
    const res = await ins.get("/toplist/detail");
    return res;
};

