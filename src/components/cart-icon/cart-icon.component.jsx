import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/111 shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIconContainer, ItemCountContainer } from './cart-icon.styles.jsx'


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer>
                <ShoppingIcon />
            </ShoppingIconContainer>
            {/* <ShoppingIcon className='shopping-icon' /> */}
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer>

    )
}

export default CartIcon;