
import  CheckoutItem  from "../../components/checkout-item/checkout-item.component";
import { selectCartPrice , selectCartItems} from "../../store/cart/cart.selector";
import {useSelector} from 'react-redux';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartItemPrice = useSelector(selectCartPrice);
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: ${cartItemPrice}</div>
    </div>
  );
};

 

export default Checkout;
