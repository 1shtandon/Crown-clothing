import { useParams } from 'react-router-dom';
import { useContext , useState , useEffect, Fragment} from 'react';
import {CategoryContainer , CategoryTitle} from './category.styles.jsx';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products &&
                    products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })
                }
            </CategoryContainer>
        </Fragment>


        
    );
}

export default Category;