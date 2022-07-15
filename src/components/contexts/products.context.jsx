import { createContext, useState } from "react";
import PRODUCTS from '../../shopData.json';

// actual value you want to access
export const ProductsContext = createContext({
  products: [],
  setShopData: () => null,
});

// functional component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };


  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};