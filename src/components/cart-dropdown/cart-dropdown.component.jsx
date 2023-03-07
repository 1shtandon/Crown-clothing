import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import {CartDropDownContainer , EmptyMessageContainer , CartItemsContainer , CartDropdownButton} from './cart-dropdown.styles.jsx';
// import Button from '../button/button.component';
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
            <CartDropDownContainer>
                <EmptyMessageContainer as='span'>Your cart is empty</EmptyMessageContainer>
                <CartDropdownButton onClick={goToShopHandler} >
                    SHOP NOW
                </CartDropdownButton>
                {/* if the button is clicked then toggle cart dropdown */}
            </CartDropDownContainer>
            :
            <CartDropDownContainer>
                <CartItemsContainer>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))}
                </CartItemsContainer>
                <CartDropdownButton onClick={goToCheckoutHandler}>
                    GO TO CHECKOUT
                </CartDropdownButton>
            </CartDropDownContainer>
    )
}

export default CartDropdown;