import { useSelector, useDispatch } from "react-redux";

import { selectToggleState, selectCartCount } from "../../store/cart/cart.selector";
import { setToggle } from "../../store/cart/cart.reducer";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();

  const toggled = useSelector(selectToggleState);
  const cartCount = useSelector(selectCartCount);

  const onClickHandler = () => dispatch(setToggle(!toggled))

  return (
    <CartIconContainer onClick={onClickHandler}>
      <ShoppingIcon/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
