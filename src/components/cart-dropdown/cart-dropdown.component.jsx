import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext);

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    }
    const goToShopHandler = () => {
        navigate('/shop');
        setIsCartOpen(false);
    }

    return (

        // if cart is empty then show the message
        cartItems.length === 0 ?
            <div className='cart-dropdown-container'>
                <span className='empty-message'>Your cart is empty</span>
                <Button onClick={goToShopHandler} >
                    SHOP NOW
                </Button>
                {/* if the button is clicked then toggle cart dropdown */}
            </div>
            :
            <div className='cart-dropdown-container'>
                <div className='cart-items'>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))}
                </div>
                <Button onClick={goToCheckoutHandler}>
                    GO TO CHECKOUT
                </Button>
            </div >
    )
}

export default CartDropdown;