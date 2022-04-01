import { createStore, combineReducers } from "redux";

import user from "./reducers/user";
import songs from "./reducers/song";
import curSongId from "./reducers/curSong";
import volAndType from "./reducers/volumn";

const rootReducer = combineReducers({
    user,
    songs,
    curSongId,
    volAndType,
});

const store = createStore(rootReducer);

export default store;
