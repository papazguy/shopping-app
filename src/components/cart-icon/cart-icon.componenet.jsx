import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss";
import {toggleCart} from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import {useSelector, useDispatch} from 'react-redux';


const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItemCount = useSelector(selectCartCount);
  const toggle = () => dispatch(toggleCart(!isCartOpen));

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggle} />
      <span className="item-count">{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
