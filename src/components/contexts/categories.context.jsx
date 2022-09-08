import { createContext, useState } from "react";

// actual value you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// functional component
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});


  const value = { categoriesMap };


  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};