import ins from "./request";

// 获取歌手列表
export async function getArtistList({limit = 30, offset = 0, type = -1, area = -1, initial = -1}) {
    const res = await ins.get("/artist/list", {
        params: {
            limit, offset, type, area, initial
        }
    });
    return res;
};

// 获取热门歌手
export async function getHotSingers(limit = 100, offset = 0) {
    const res = await ins.get('/top/artists', {
        params: {
            limit, offset
        }
    });
    return res;
}