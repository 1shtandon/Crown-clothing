import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {

    // set products from database
    const [categoriesMap, setCategoriesMap] = useState({});

    // fetch products from database
    useEffect(() => {

        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap); 
            setCategoriesMap(categoryMap);
        }; 
        getCategoriesMap();
    }, []);

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
}; 