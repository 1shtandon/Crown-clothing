import styled from "styled-components";

export const ProductCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;

    img {
        width: 100%;
        height: 95%;
        object-fit: cover;
        margin-bottom: 5px;
    }

    button {
        width: 85%;
        opacity: 0.7;
        position: absolute;
        top: 255px;
        display: none;
    }

    &:hover {
        img {
            opacity: 0.8;
        }

        button {
            opacity: 0.85;
            display: flex;
        }
    }

    @media screen and (max-width: 800px) {
        width: 100%;
        height: 350px;
        margin-bottom: 10px;

        img {
            height: 350px;
            width: 100%;
            margin-bottom: 5px;
            object-fit: cover;
        }

        button {
            opacity: 0.9;
            min-width: unset;
            padding: 0 10px;
        }

        &:hover {
            img {
                opacity: unset;
            }

            button {
                opacity: 0.9;
                display: flex;
            }
        }
    }
`;

export const Footer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    @media screen and (max-width: 800px) {
        width: 100%;
        height: 5%;
        font-size: 16px;
    }
`;

export const Name = styled.span`
    width: 90%;
    margin-bottom: 15px;
`;

export const Price = styled.span`
    width: 10%;
    padding-right: 10px;
    text-align: right;
`;