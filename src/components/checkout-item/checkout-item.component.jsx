import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addItemHandler = () => {
        addItemToCart(cartItem);
    }

    const removeItemHandler = () => {
        removeItemFromCart(cartItem);
    }

    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
    }


    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='checkout-item-container prevent-select'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <span className='modify-quantity' onClick={removeItemHandler}> &lt;  &nbsp; </span>
                {quantity}
                <span className='modify-quantity' onClick={addItemHandler}> &nbsp; &gt; </span>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;