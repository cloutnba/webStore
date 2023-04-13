import './ProductDetails.scss';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import Product from "./components/Product";
import { actionFetchOneProduct} from "../../reducers";
import { selectorServerErrorProductDetails } from "../../selectors";
import ServerError from "../../components/Notifications/ServerError";

const ProductDetails = () => {
    let {itemNo} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionFetchOneProduct(itemNo));
    }, [itemNo, dispatch]);

    const serverError = useSelector(selectorServerErrorProductDetails);

    return (
        <main>
            { serverError && <ServerError /> }
            <Product/>
        </main>

    )
};

export default ProductDetails;
