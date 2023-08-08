import { FC, ButtonHTMLAttributes } from "react";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner
} from "./button.styles";

export enum BUTTON_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
};

const getButton = (buttonType = BUTTON_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_CLASSES.base]: BaseButton,
    [BUTTON_CLASSES.google]: GoogleSignInButton,
    [BUTTON_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...props }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...props}>{isLoading ? <ButtonSpinner /> : children}</CustomButton>;
};

export default Button;
