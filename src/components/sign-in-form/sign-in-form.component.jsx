import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignInContainer , SignInTitle , ButtonsContainer} from "./sign-in-form.styles.jsx";
import Button  from "../button/button.component";
const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetformFields = () => {
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetformFields();
        }
        catch (error) {
            if (error.code === "auth/wrong-password") {
                alert("Incorrect password");
            }
            else if (error.code === "auth/user-not-found") {
                alert("User not found");
            }
            console.log("User sign in encountered an error ", error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <SignInTitle>Already have an account?</SignInTitle>
            Signin with your Email/Password
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

                <ButtonsContainer>
                    <Button type="submit" className="custom-button">Sign In</Button>
                    <Button onClick={signInWithGoogle}
                        isGoogleSignIn
                      
                    >GOOGLE SIGN IN</Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    );
}

export default SignInForm;