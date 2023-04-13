import FilterMainList from './components/FilterMainList';
import { Container } from '@mui/material';
import {
  selectorAllProducts,
  selectorSearchInputValue,
  selectorServerErrorProducts,
  selectorProductsQuantity,
  selectorPageLoading,
  selectorFilterRequest,
  selectorUrlAddress,
  selectorShowPaginaton,
} from '../../selectors';
import {
  actionFetchAllProducts,
  actionFetchSearchFilterProducts,
  actionFetchSearchProducts,
  actionFilterRequest,
  actionFirstVisitAndResetToCorectFilter,
} from '../../reducers';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import BreadCrumbs from '../../components/BreadCrumbs';
import ServerError from '../../components/Notifications/ServerError';
import Paginate from './components/Paginate';
import './Products.scss';
import Preloader from '../../components/Preloader';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import {actionResetSearch} from "../../reducers/products.reducer";

const Products = () => {
  const allProducts = useSelector(selectorAllProducts);
  const productsQuantity = useSelector(selectorProductsQuantity);
  const searchInputValue = useSelector(selectorSearchInputValue);
  const serverError = useSelector(selectorServerErrorProducts);
  const pageLoading = useSelector(selectorPageLoading);
  const showPagination = useSelector(selectorShowPaginaton)


  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  let urlString = location.search
  let newFilterRequestObj = useSelector(selectorFilterRequest)
  let requestObj = { ...newFilterRequestObj }

  const urlAddress = useSelector(selectorUrlAddress) || urlString

  let getLinkObj = {}
  let stringToarr = urlString.substring(1)
  stringToarr = stringToarr.replaceAll(/%2C/ig, ',')
  stringToarr = stringToarr.replaceAll(/\+/g, " ")

  let arr = stringToarr.split('&')
  let arrKeyValue = arr.map((el) => {
    return el.split('=')
  })

  arrKeyValue.forEach((e) => {
    getLinkObj[e[0]] = e[1]
  })


  for (let key in requestObj) {
    for (let keyLink in getLinkObj) {
      if (key == keyLink) {
        if (key == 'perPage' || key == 'startPage') {
          requestObj[key] = Number(getLinkObj[keyLink])
        } else {
          requestObj[key] = getLinkObj[keyLink]
        }

      }
    }
  }

  useEffect(() => {
    setSearchParams(urlAddress)
  }, [urlAddress])

  const resetFilters = () => {
    dispatch(actionFirstVisitAndResetToCorectFilter(false))
    dispatch(actionFetchSearchFilterProducts({
      brand: '',
      category: '',
      processorBrand: '',
      screenSize: '',
      color: '',
      ramMemory: '',
      hardDriveCapacity: '',
      perPage: 6,
      startPage: 1,
      minPrice: '',
      maxPrice: '',
      sort: '',
    }))  

  }



  useEffect(() => {
    if (searchInputValue === '') {
      let obj = JSON.parse(sessionStorage.getItem('filterRequest'));
      if (obj) {
        dispatch(actionFetchSearchFilterProducts(obj));
      }
      else {
        dispatch(actionFilterRequest(requestObj))
        dispatch(actionFetchAllProducts(urlString));
   
      }
    } else {
      dispatch(actionFetchSearchProducts(searchInputValue));
    }
    return () => {

      dispatch(actionResetSearch());
    }
  }, [location]);

  return (
    <main>
      <Container className="main-list" maxWidth="lg">
        <Preloader open={pageLoading} />
        {serverError && <ServerError />}
        {!serverError && (
          <>
            <BreadCrumbs linksArray={[{ link: '/products', text: 'Products' }]} />
            <div className='products-header'>
              <p className="count-found-product">
                Products <span className="title_contrast">{productsQuantity} found</span>
              </p>
              <Button type={"button"} text="Reset filters" onClick={() => resetFilters()} className="btn-reset-filter" />

            </div>
            <section className="main-list__sections">
              <div className="main-list__sections--products">
                {allProducts.length > 0 && !serverError ? (
                  <>
                    <div className="grid-main-list">
                      {allProducts?.map((el, index) => (
                        <ProductCard el={el} key={el._id} index={index} />
                      ))}
                    </div>
                    {showPagination && <Paginate />}
                  </>
                ) : (
                  <p className="text-product__not-found">
                   {!pageLoading && 'Nothing to find, please enter correct name or change your filter'}
                  </p>
                )}
              </div>
              <div className="main-list__sections--filters">
                <FilterMainList />
              </div>
            </section>
          </>
        )}
      </Container>
    </main>
  );
};
export default Products;
