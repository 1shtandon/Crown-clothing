import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectToggleState } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.reducer";

import { NavbarContainer, LogoContainer, NavLinks, NavLink } from "./navbar.styles";

const Navbar = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser)
  const toggled = useSelector(selectToggleState);

  const onSignOutHandler = () => {dispatch(signOutStart())}

  return (
    <Fragment>
      <NavbarContainer>
        <LogoContainer to={"/"}>
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to={"shop"}>
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={onSignOutHandler}>
              Signout
            </NavLink>
          ) : (
            <NavLink to={"auth"}>
              Signin
            </NavLink>
          )}
          {/* <Link className="nav-link" to={"signup"}>
            Signup
          </Link> */}
          <CartIcon />
        </NavLinks>

        {toggled && <CartDropdown />}
      </NavbarContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
