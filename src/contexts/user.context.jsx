import { createContext, useState, useEffect } from "react";

import { onAuthStateChangeListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual storage value that we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// context provider component
// this is the component that will provide the context value to the components that are wrapped by it
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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
            console.log("User changed", user);
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}