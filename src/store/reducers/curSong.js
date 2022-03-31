import { SETSONGID } from "../actions/curSongId";


const curSongId = JSON.parse(localStorage.getItem('cur-song-id')) || null;
const initialState = curSongId;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SETSONGID:
            localStorage.setItem('cur-song-id', JSON.stringify(payload));
            localStorage.setItem('is-play', 1);
            return payload;
        default:
            return state;
    }
}
