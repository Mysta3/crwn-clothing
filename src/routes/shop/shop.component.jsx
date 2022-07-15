import { useContext } from "react";
import { ProductsContext } from "../../components/contexts/products.context";
import ProductCard from "../../components/product-card/productCard.component";
import './shop.styles.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="productsContainer">
      {
        products.map((product) => (
        <ProductCard key={ product.id } product={ product } />
      ))
      };
    </div>
  );
};


export default Shop;