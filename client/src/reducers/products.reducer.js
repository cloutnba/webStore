import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SEARCH_PRODUCTS, FILTERED_PRODUCTS, GET_ALL_PRODUCTS_URL } from '../endpoints';


const initialState = {
  allProducts: [],
  productsQuantity: 0,
  firstVisitAndResetToCorectFilter: false, 
  showPaginaton: true, 
  sortByPrise: 'Popular',
  searchInputValue: JSON.parse(sessionStorage.getItem('searchInputValue')) || '',
  pageLoading: false,
  serverError: null,
  urlAddress: '',
  filterRequest:  JSON.parse(sessionStorage.getItem('filterRequest')) || {
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
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    actionAllProducts: (state, { payload }) => {
      state.allProducts = [...payload];
    },
    actionFirstVisitAndResetToCorectFilter: (state, { payload }) => {
      state.firstVisitAndResetToCorectFilter = payload;
    },
    actionShowPaginaton: (state, { payload }) => {
      state.showPaginaton = payload;
    },
    actionProductsQuantity: (state, { payload }) => {
      state.productsQuantity = payload;
    },
    actionUrlAddress: (state, { payload }) => {
      state.urlAddress = payload;
    },
    actionSortByPrise: (state, { payload }) => {
      state.sortByPrise = payload;
    },
    actionPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },
    actionSearchInputValue: (state, { payload }) => {
      state.searchInputValue = payload;
    },
    actionResetSearch: (state) => {
      state.allProducts = initialState.allProducts;
      state.searchInputValue = '';
    },
    actionServerError: (state, { payload }) => {
      state.serverError = payload;
    },
    actionFilterRequest: (state, { payload }) => {
      state.filterRequest = payload;
      sessionStorage.setItem('filterRequest', JSON.stringify(payload)); 
    },
  },
});
export const {
  actionAllProducts,
  actionProductsQuantity,
  actionPageLoading,
  actionShowPaginaton,
  actionSearchInputValue,
  actionResetSearch,
  actionServerError,
  actionSortByPrise,
  actionFilterRequest,
  actionProductComments,
  actionUrlAddress,
  actionFirstVisitAndResetToCorectFilter,
} = productsSlice.actions;

export const actionFetchAllProducts = (link) => (dispatch) => {
  if(link === ''){
    link = '?perPage=6&startPage=1'
  }
  dispatch(actionPageLoading(true));
  dispatch(actionShowPaginaton(true))
  return axios
    .get(`${GET_ALL_PRODUCTS_URL}${link}`)
    .then(({ data }) => {
      dispatch(actionProductsQuantity(data.productsQuantity));
      dispatch(actionAllProducts(data.products));
      dispatch(actionPageLoading(false));
      dispatch(actionFirstVisitAndResetToCorectFilter(true)) 
     
    })
    .catch(() => {
      dispatch(actionPageLoading(false));
       dispatch(actionServerError(true)); 
    });
};

export const actionFetchSearchFilterProducts = (newFilterRequestObj) => (dispatch) => {
  dispatch(actionPageLoading(true));
  dispatch(actionShowPaginaton(true))
  dispatch(actionFilterRequest(newFilterRequestObj));
  let arrRequest = [];
  for (let key in newFilterRequestObj) {
    if (newFilterRequestObj[key] !== '') {
      arrRequest.push([key, newFilterRequestObj[key]]);
    }
  }
  let filter = new URLSearchParams(arrRequest).toString();
   dispatch(actionUrlAddress(filter)) 
  return axios
    .get(`${FILTERED_PRODUCTS}${filter}`)
    .then(({ data }) => {
      dispatch(actionProductsQuantity(data.productsQuantity));
      dispatch(actionAllProducts(data.products));
      dispatch(actionSearchInputValue(''));
      dispatch(actionPageLoading(false));
      dispatch(actionFirstVisitAndResetToCorectFilter(true)) 
    })
    .catch(() => {
      dispatch(actionPageLoading(false));
      dispatch(actionServerError(true));
    });
};

export const actionFetchSearchProducts = (inputValue) => (dispatch) => {
  dispatch(actionPageLoading(true));
  dispatch(actionFirstVisitAndResetToCorectFilter(false)) 
  dispatch(actionFilterRequest({
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
  dispatch(actionShowPaginaton(false))
  return axios
    .post(SEARCH_PRODUCTS, { query: inputValue})
    .then(({ data }) => {
      dispatch(actionProductsQuantity(data.length));
      dispatch(actionAllProducts(data));
      dispatch(actionPageLoading(false));
      dispatch(actionFirstVisitAndResetToCorectFilter(true)) 
    })
    .catch(() => {
      dispatch(actionPageLoading(false));
      dispatch(actionServerError(true));
    });
};

export default productsSlice.reducer;
