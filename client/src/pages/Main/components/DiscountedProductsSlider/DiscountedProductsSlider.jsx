import './DiscountedProductsSlider.scss';
import ProductsSlider from '../../../../components/ProductsSlider';
import { Container } from "@mui/material";
import { selectorDiscountedProducts } from "../../../../selectors";
import { actionFetchDiscountedProducts } from "../../../../reducers";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

const DiscountedProductsSlider = () => {
  const discountedProducts = useSelector(selectorDiscountedProducts)
  const availableDiscountedProducts = discountedProducts.filter(product => product.quantity > 0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionFetchDiscountedProducts())
  }, [])
  return(
  <>
      {!!availableDiscountedProducts.length &&
      (
      <Container maxWidth="lg" className="discounted-products">
        <h2 className="discounted-products__title"><span className="discounted-products__title-colored">DISCOUNTED</span> PRODUCTS</h2>
      <ProductsSlider products={availableDiscountedProducts}
                      productsLimit={10} />
            </Container>
      )
      }
    </>
  )
};

export default DiscountedProductsSlider;
