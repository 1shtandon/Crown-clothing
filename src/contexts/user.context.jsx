import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

import { onAuthStateChangeListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual storage value that we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

const INTIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`Invalid action type ${type} in userReducer`);
    }
}


// context provider component
// this is the component that will provide the context value to the components that are wrapped by it



export const UserProvider = ({ children }) => {


    const [{ currentUser }, dispatch] = useReducer(userReducer, INTIAL_STATE);

    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = {
        currentUser,
        setCurrentUser,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

