// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { selectCurrentUser } from "../../store/user/user.selector";

import { AuthPageContainer } from "./authentication.styles";

const Authentication = () => {
  // useEffect(() => {
  //   const getRedRes = async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);

  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };

  //   getRedRes();
  // }, []);
  const currentUser = useSelector(selectCurrentUser)

  if (currentUser) return (<Navigate to={"/"} replace={true} />)
  
  return (
    <AuthPageContainer>
      <SignInForm />
      {/* <SignInForm 
        onClickEvent={signInWithGoogleRedirect}/> */}
      <SignUpForm />
    </AuthPageContainer>
  );
};

export default Authentication;
