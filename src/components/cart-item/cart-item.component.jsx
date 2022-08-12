import { 
  CartItemContainer,
  ItemDetails,
  Image, 
  Span 
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Span>{name}</Span>
        <Span>
          {quantity} x ${price}
        </Span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;