import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button, { BUTTON_CLASSES } from "../Button/button.component";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/categories/categories.types";

import { ProductCardContainer, Footer, Name, Price } from  "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price } = product;

  const addProduct = () => {
    dispatch(addItemToCart(cartItems, product))
  }

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />

      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>

      <Button buttonType={BUTTON_CLASSES.inverted} onClick={addProduct}>Add to cart</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
