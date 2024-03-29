import styled from 'styled-components';

export const BaseButton = styled.button`
    min-width: 165px;  
    height: 50px;
    width: 180px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: flex;
    justify-content: center;
    background: black;
    color: white;
    &:hover {
        background-color: grey;
        color: rgb(3, 0, 0);
        border: 1px solid black;
    }
    `;

export const GoogleSignInButton = styled(BaseButton)`
    background-color: #4285f4;
    &:hover {
        background-color: #357ae8;
        color: rgb(252, 250, 250);
        border: black;
    }
    `;

export const InvertedButton = styled(BaseButton)`
    background-color: white;
    color: black;
    &:hover {
        background-color: rgb(14, 1, 1);
        color: rgb(248, 240, 240);
        border: 1px solid rgb(250, 247, 247);
    }
`;
