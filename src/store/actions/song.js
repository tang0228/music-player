export const ADDSONG = Symbol("add-song");

// 添加一首歌播放
export function addSongAction(url) {
    return {
        type: ADDSONG,
        payload: url
    }
}