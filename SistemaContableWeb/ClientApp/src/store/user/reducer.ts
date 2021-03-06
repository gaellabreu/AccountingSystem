import { SET_USER_DATA, REMOVE_USER_DATA } from './types';

const INITIAL_STATE = {
    userData: {} as any
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload };
        case REMOVE_USER_DATA: {
            return { ...{} }
        }
        default: return state;
    }
};