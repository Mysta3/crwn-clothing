import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
import {
  CheckoutItemContainer,
  ImageContainer,
  Image,
  Details,
  Quantity,
  Arrow,
  Value,
  RemoveButton
} from './checkout-item.styles.jsx'

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={name}/>
      </ImageContainer>
      <Details>{name}</Details>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
          <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Details>{price}</Details>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem