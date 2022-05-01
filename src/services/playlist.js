import ins from "./request"

/**
 * 删除歌单
 * @param {*} param 歌单id
 * @returns 
 */
export async function delPlayList( {id}) {
    const res = await ins.post('/playlist/delete', {
        id
    });
    return res;
}

/**
 * 创建歌单
 * @param {*} param 歌单名称
 * @returns 
 */
export async function createPlayList( {name}) {
    const res = await ins.post('/playlist/create', {
        name
    });
    return res;
}