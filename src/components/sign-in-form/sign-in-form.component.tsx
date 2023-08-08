import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"; 

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.reducer";
import { selectUserError } from "../../store/user/user.selector";

import { SignInContainer, ButtonContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectUserError);
  useEffect(() => {
    if (error) {
      if ((error as AuthError).code === AuthErrorCodes.USER_DELETED)
          alert("Account with this email address does not exist");
      else if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD)
          alert("Email address or password is incorrect");
      console.error("Error:", error)
    }
  }, [error])

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart())
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(emailSignInStart({email, password}))
    resetFormFields();
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with you email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <ButtonContainer>
          <Button type="submit">Sign in</Button>
          <Button type="button" onClick={handleGoogleSignIn} buttonType={BUTTON_CLASSES.google}>
            Sign In with Google
          </Button>
        </ButtonContainer>
      </form>

      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google (Redirect)
      </button> */}
    </SignInContainer>
  );
};

export default SignInForm;
