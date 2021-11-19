import { ADDUSER, DELUSER } from "../actions/user";

const user = JSON.parse(localStorage.getItem('user')) || null;
const initialState = user;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
    case ADDUSER:
        return payload;
    case DELUSER:
        return null;
    default:
        return state
    }
}
