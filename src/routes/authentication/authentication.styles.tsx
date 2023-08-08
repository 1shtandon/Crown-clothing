import styled from "styled-components";

export const AuthPageContainer = styled.div`
    display: flex;
    width: 1200px;
    justify-content: space-between;
    margin: 60px auto;

    @media screen and (max-width: 1267px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 60px;
    }
    
    @media screen and (max-width: 800px) {
        width: 90vw;
        padding: 0 0px;
        margin: 0;
    }

    @media screen and (max-width: 500px) {
        gap: 30px;
    }

    @media screen and (max-width: 400px) {
        gap: 20px;
        padding: 0;
    }
`