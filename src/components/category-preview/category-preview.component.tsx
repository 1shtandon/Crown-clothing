import { FC } from "react";

import { CategoryItem } from "../../store/categories/categories.types";

import ProductCard from "../ProductCard/product-card.component";

import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title.toLowerCase()}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
