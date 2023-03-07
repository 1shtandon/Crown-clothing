import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer, SignUpTitle } from "./sign-up-form.styles.jsx";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetformFields = () => {
        setFormFields(defaultFormFields);
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // using the context to set the current user
            await createUserDocumentFromAuth(user, { displayName });
            resetformFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            }

            console.log("User creation encountered an error ", error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignUpContainer>
            <SignUpTitle>Don't have an account?</SignUpTitle>
            Signup with your Email/Password
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Username"
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

                <Button type="submit" className="custom-button">Sign Up</Button>

            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;