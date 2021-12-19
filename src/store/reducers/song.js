import { ADDSONG } from "../actions/song";

const song = JSON.parse(localStorage.getItem("song_url")) || "";
const initialState = song;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
    case ADDSONG:
        return payload;
    default:
        return state
    }
}
