import "./product-card.styles.scss";
import Button from "../button/button.component";
import './product-card.styles.scss';
import { useSelector , useDispatch} from 'react-redux'
import {addItemToCart} from '../../store/cart/cart.action'
import {selectCartItems } from '../../store/cart/cart.selector.js'

const ProductCard = ({ product }) => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();
  

 // console.log(cartItems)
  
  const { name, price, imageUrl } = product;
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));// include cartItemssss
 
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;