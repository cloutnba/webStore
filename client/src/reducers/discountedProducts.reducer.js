import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FILTERED_PRODUCTS } from '../endpoints';


const initialState = {
    discountedProducts: [],
    isLoading: false,
    serverError: null
}

const discountedProductsSlice = createSlice({
  name: "discountedProducts",
  initialState,
  reducers: {
    actionDiscountedProducts: (state, {payload}) => {
      state.discountedProducts = payload
    },
    actionPageLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    actionServerError: (state, {payload}) => {
      state.serverError = payload;
    }
    }
})

export const {
    actionDiscountedProducts,
    actionPageLoading,
    actionServerError,
} = discountedProductsSlice.actions


export const actionFetchDiscountedProducts = () => (dispatch) => {
    const filterDiscountProductsString = new URLSearchParams({isDiscounted: true})

    return axios.get(FILTERED_PRODUCTS, {params: filterDiscountProductsString} )
        .then(({data}) => {
            dispatch(actionDiscountedProducts(data.products));
        })
        .catch(() => dispatch(actionServerError(true)))
}

export default discountedProductsSlice.reducer
