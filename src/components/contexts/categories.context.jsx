import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";


// actual value you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// functional component
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(`file: products.context.jsx ~ line 18 ~ getCategoriesMap ~ categoryMap`, categoryMap);
      setCategoriesMap(categoryMap);
    }

    getCategoriesMap();
  }, [])

  const value = { categoriesMap };


  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};