export const ADDSONG = Symbol("add-song");
export const DELETEALLSONG = Symbol("delete-all-song");
export const DELETEONESONG = Symbol("delete-one-song");
export const ADDSONGLIST = Symbol("add-song-list");

// 添加一首歌播放
export function addSongAction(song) {
    return {
        type: ADDSONG,
        payload: song
    }
}

// 添加歌单播放
export function addSongListAction(songs) {
    return {
        type: ADDSONGLIST,
        payload: songs
    }
}

// 删除播放列表所有歌曲
export function deleteAllSongAction() {
    return {
        type: DELETEALLSONG,
    }
}

// 删除一首歌曲, 传歌曲ID
export function deleteOneSongAction(id) {
    return {
        type: DELETEONESONG,
        payload: id
    }
}
