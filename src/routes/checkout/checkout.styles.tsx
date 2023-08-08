import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  @media screen and (max-width: 800px) {
    width: 90%;
  }
`

export const CheckoutHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  border-bottom: 1px solid darkgray;
`

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }

  @media screen and (max-width: 800px) {
    width: 22%;
  }
`

export const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`