import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total, ModifyQuantity } from './checkout.styles.jsx';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { Form } from 'react-router-dom';

const CheckoutPage = () => {

    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>Product</HeaderBlock>
                <HeaderBlock>Description</HeaderBlock>
                <HeaderBlock>Quantity</HeaderBlock>
                <HeaderBlock>Price</HeaderBlock>
                <HeaderBlock>Remove</HeaderBlock>
            </CheckoutHeader>
            {cartItems.map(
                (cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    );
                })}
            <Total>Total:
                ${cartTotal}
            </Total>
        </CheckoutContainer>
    )
}

export default CheckoutPage;