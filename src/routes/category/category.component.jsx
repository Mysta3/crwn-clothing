import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/productCard.component';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

const Category = () => {
 const  { category } = useParams();
 const categoriesMap = useSelector(selectCategoriesMap);
  
 const [products, setProducts] = useState(categoriesMap[category]);

 useEffect(() => {
  setProducts(categoriesMap[category]);
 }, [category, categoriesMap])

 return (
  <Fragment>
    <CategoryTitle>{ category }</CategoryTitle>
    <CategoryContainer>
      {products && 
        products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </CategoryContainer>
  </Fragment>
 )
};

export default Category;