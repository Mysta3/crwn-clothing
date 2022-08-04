import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../components/contexts/user.context';
import { CartContext } from '../../components/contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils.js';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to='/auth'>Sign In</NavLink>
            )
          }
          <CartIcon/>
        </NavLinks>

        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;