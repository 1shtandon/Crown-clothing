import styled, { css } from "styled-components";

const sub_color = "gray";
const main_color = "black";

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 14px;
  font-weight: bolder;
  letter-spacing: 0.025em;
  color: ${main_color};
`;

type FormInputLabelProps = {
  shrink: boolean;
}

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${sub_color};
  font-size: 18px;
  letter-spacing: 0.04em;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

export const FormInputBox = styled.input`
  background: none;
  background-color: white;
  color: ${sub_color};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${sub_color};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;
