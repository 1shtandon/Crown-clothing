import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../Button/button.component";

import { signUpStart } from "../../store/user/user.reducer";
import { selectUserError } from "../../store/user/user.selector";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();

  const error = useSelector(selectUserError);
  useEffect(() => {
    if (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already in use");
      }
      console.log(
        "Error occured creating from email and password",
        error
      );
    }
  }, [error])

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // var { displayName, email, password, confirmPassword } = event.target;
    // displayName = displayName.value;
    // email = email.value;
    // password = password.value;
    // confirmPassword = confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const additionalInfo = { displayName };
    dispatch(signUpStart({email, password, additionalInfo}));
    resetFormFields();

  };

  return (
    <SignUpContainer>
      <h2>I do not have an account</h2>
      <span>Sign Up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
