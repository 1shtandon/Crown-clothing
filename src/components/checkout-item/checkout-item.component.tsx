import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart, removeItemFromCart, removeProduct } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.types";

import { CheckoutItemContainer, ImageContainer, Name, Price, Quantity, Arrow, Value, RemoveButton } from  "./checkout-item.styles";

type CheckoutItemProps = {
  product: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, product));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, product));
  const clearItemHandler = () => dispatch(removeProduct(cartItems, product));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={product.imageUrl} alt={product.name} />  
      </ImageContainer>
      <Name>{product.name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{product.quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{product.price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
