import styled from "styled-components";

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    min-width: max-content;

    h2 {
        margin: 10px 0;
    }

    @media screen and (max-width: 1267px) {
        width: 50%;
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