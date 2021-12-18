import { ADDSONG } from "../actions/song";

const initialState = "";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
    case ADDSONG:
        return payload;
    default:
        return state
    }
}
