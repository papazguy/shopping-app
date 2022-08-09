import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useSelect } from "react";
import { useSelector } from 'react-redux';
import CartIcon from "../../components/cart-icon/cart-icon.componenet";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartContext } from "../../context/cart-dropdown.context"
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer,
        NavLinks,
        NavLink,
        LogoContainer,} from "./navigation.styles";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);  
  const { isCartOpen } = useContext(CartContext);

  

  const signOutHandler = async () => {
    await signOutUser();
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
