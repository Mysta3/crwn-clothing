import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './productCard.styles.scss';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);
  return (
    <div className='productCardContainer'>
      <img alt={`${name}`} src={imageUrl}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </div>
  );
};


export default ProductCard;