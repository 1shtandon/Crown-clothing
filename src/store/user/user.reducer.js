import { USER_ACTION_TYPES } from "./user.types";
import { setCurrentUser } from "./user.action";

const INTIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INTIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            return state;
    }
}