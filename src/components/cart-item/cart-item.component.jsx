import {CartItemContainer , CartItemImage , CartItemDetails , CartItemName} from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt={
                `${name}` 
            } />
            <CartItemDetails>
                <CartItemName >{name}</CartItemName>
                <CartItemName>{quantity} x ${price}</CartItemName>
            </CartItemDetails>
            
        </CartItemContainer>
    )
}

export default CartItem;