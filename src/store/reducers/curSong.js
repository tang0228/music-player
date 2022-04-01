import { SETSONGID } from "../actions/curSongId";


const curSongId = JSON.parse(localStorage.getItem('cur-song-id')) || null;
const initialState = curSongId;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SETSONGID:
            localStorage.setItem('cur-song-id', JSON.stringify(payload));
            const audio = document.getElementById("my-audio");
            if (audio) {
                audio.autoplay = true;
            }
            return payload;
        default:
            return state;
    }
}
