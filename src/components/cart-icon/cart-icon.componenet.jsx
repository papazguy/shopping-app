import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart-dropdown.context";
import "./cart-icon.styles.scss";


const CartIcon = () => {
  const { cartItemCount, isCartOpen, setIsCartOpen } = useContext(CartContext);
  console.log(cartItemCount);

  const toggle = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggle} />
      <span className="item-count">{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
