import { BaseButton , GoogleSignInButton , InvertedButton } from "./button.styles";

const getButtonStyles = (props) => {
    if (props.isGoogleSignIn) {
        return GoogleSignInButton;
    }
    return props.inverted ? InvertedButton : BaseButton;
};

const Button = (props) => {
    const ButtonStyles = getButtonStyles(props);
    return (
        <ButtonStyles {...props}>
            {props.children}
        </ButtonStyles>
    );
};

export default Button;