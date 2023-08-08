import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../store/cart/cart.selector.ts";

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
  ButtonStyled,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>

      <ButtonStyled
        onClick={() => {
          navigate("/checkout");
        }}>
        GO TO CHECKOUT
      </ButtonStyled>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
