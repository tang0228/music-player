import ins from "./request";

// 获取歌手列表
export async function getArtistList({limit, offset, type, area, initial}) {
    const res = await ins.get("/artist/list", {
        params: {
            limit, offset, type, area, initial
        }
    });
    return res;
}