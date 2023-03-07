import {DirectoryItemContainer , BackgroundImage , Body , Title , Subtitle} from './directory-item.styles.jsx';
import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer>
            <BackgroundImage style={
                {
                    backgroundImage: `url(${imageUrl})`
                }
            } />
            <Body to={`/shop/${title.toLowerCase()}`}>
                <Title>{title}</Title>
                <Subtitle>Shop Now</Subtitle>
            </Body> 
        </DirectoryItemContainer>
    )
}


export default DirectoryItem;