import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Category } from "../../store/categories/categories.types";

import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";

type DirectoryItemProps = {
  category: Category
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();

  const toCategory = () => {
    navigate(`shop/${title.toLowerCase()}`)
  }

  return (
    <DirectoryItemContainer onClick={toCategory}>
      <BackgroundImage
        imageUrl={imageUrl}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
