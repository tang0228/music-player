export const SETSONGID = Symbol("set-song-id");

// 添加一首歌播放
export function setCurSongIdAction(id) {
    return {
        type: SETSONGID,
        payload: id
    }
}
