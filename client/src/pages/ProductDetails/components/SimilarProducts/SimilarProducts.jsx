import { useEffect }  from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectorProduct, selectorSimilarProducts } from "../../../../selectors";
import './SimilarProducts.scss';
import { actionFetchSimilarProducts } from "../../../../reducers/productDetails.reducer";
import ProductsSlider from "../../../../components/ProductsSlider";

const SimilarProducts = ({id}) => {
    const dispatch = useDispatch();
    const product = useSelector(selectorProduct);
    const similarProducts = useSelector(selectorSimilarProducts);
    const availableDiscountedProducts = similarProducts.filter(product => product.quantity > 0 && product._id !== id)

    // TODO: Добавить фильтрацию по цене после расширения бд
    const currentPrice = product.currentPrice;
    const category = product.category;
    const filters = {
        category,
        // minPrice: currentPrice - 100,
        // maxPrice: currentPrice + 500
    }

    useEffect(() => {
        dispatch(actionFetchSimilarProducts(filters));
    }, [product])

    const shownProduct = similarProducts?.filter(({_id}) => _id !== product._id);

    return (
        <>
            { shownProduct.length > 0 && (
                <div className="similar-products__container">
                    <h3 className="similar-products__title">Similar items <span>you might like</span></h3>
                    <ProductsSlider products={availableDiscountedProducts} productsLimit={10}/>
                </div>
            ) }
        </>
    );
};

export default SimilarProducts;
