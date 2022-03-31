import { createStore, combineReducers } from "redux";

import user from "./reducers/user";
import songs from "./reducers/song";
import curSongId from "./reducers/curSong";

const rootReducer = combineReducers({
    user,
    songs,
    curSongId,
});

const store = createStore(rootReducer);

export default store;
