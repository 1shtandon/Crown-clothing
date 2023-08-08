import styled from "styled-components";

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;

    h2 {
        margin: 10px 0;
    }

    @media screen and (max-width: 1267px) {
        width: 54%;
    }

    @media screen and (max-width: 800px) {
        width: 60%;
    }

    @media screen and (max-width: 500px) {
        width: 80%;
    }

    @media screen and (max-width: 400px) {
        width: 90%;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;

    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 10px;
    }
`