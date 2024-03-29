import { useContext } from "react";

import { ProductCardContainer, ProductCardFooter, ProductCardName, ProductCardPrice } from "./product-card.styles.jsx";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {

    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product);
    }

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ProductCardFooter>
                <ProductCardName>{name}</ProductCardName>
                <ProductCardPrice>{price}</ProductCardPrice>
            </ProductCardFooter>
            <Button inverted onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    );
};

export default ProductCard;