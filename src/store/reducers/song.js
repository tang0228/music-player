import { ADDSONG, DELETEALLSONG, DELETEONESONG } from "../actions/song";
import utils from "@/utils";
const song = JSON.parse(localStorage.getItem("songs")) || [];
const initialState = song;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
    case ADDSONG:
        let songs = utils.unique([...state, ...payload]);
        localStorage.setItem("songs", JSON.stringify(songs));
        let audio = document.getElementById('my-audio');
        audio.autoplay = true;
        return songs;
    case DELETEONESONG:
        return state.filter(song => song.id !== payload.id);
    case DELETEALLSONG:
        return [];
    default:
        return state
    }
}
