import ins from "./request";

// 获取新碟列表
export async function getAlbumList({ limit, offset, area }) {
    const res = await ins.get("/album/new", {
        params: {
            limit, offset, area
        }
    });
    return res;
}