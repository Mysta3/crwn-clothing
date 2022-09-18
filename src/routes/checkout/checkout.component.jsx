import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  



  return(
      <CheckoutContainer>
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>X</span>
          </HeaderBlock>
        </CheckoutHeader>
          {
            cartItems.map((cartItem) =>
              <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )
          }
          <Total as='span'>Total: ${cartTotal}</Total>
      </CheckoutContainer>
      );
}

export default Checkout;