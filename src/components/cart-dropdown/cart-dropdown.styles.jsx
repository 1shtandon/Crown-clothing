import styled from "styled-components";
import Button from "../Button/button.component";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 320px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 25px;
  z-index: 5;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 280px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: none;
`;

export const ButtonStyled = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;