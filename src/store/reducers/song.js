import { ADDSONG, DELETEALLSONG, DELETEONESONG, ADDSONGLIST } from "../actions/song";
import utils from "@/utils";
const song = JSON.parse(localStorage.getItem("songs")) || [];
const initialState = song;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADDSONG:
            let songs = utils.unique([...state, ...payload]);
            localStorage.setItem("songs", JSON.stringify(songs));
            return songs;
        case ADDSONGLIST:
            localStorage.setItem("songs", JSON.stringify(payload));
            return payload;
        case DELETEONESONG:
            let list = state.filter(song => song.id !== payload)
            localStorage.setItem("songs", JSON.stringify(list));
            return list;
        case DELETEALLSONG:
            localStorage.setItem("songs", JSON.stringify([]));
            return [];
        default:
            return state
    }
}
