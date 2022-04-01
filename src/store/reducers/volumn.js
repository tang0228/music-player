import { SETVOLUMNANDTYPE } from "../actions/volumn";

const volAndType = JSON.parse(localStorage.getItem('set')) || {
    vol: 1,
    type: 0
};
const initialState = volAndType;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SETVOLUMNANDTYPE:
            let obj = { ...state, ...payload };
            localStorage.setItem("set", JSON.stringify(obj))
            return obj;
        default:
            return state;
    }
}
