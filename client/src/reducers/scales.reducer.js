import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_DETAILS_PRODUCT } from '../endpoints';

const initialState = {
  scales: JSON.parse(localStorage.getItem('scales')) || [],
  productDataComparison: [],
  pageLoading: false,
  serverError: null,
};

const scalesSlice = createSlice({
  name: 'scales',
  initialState,
  reducers: {
    actionAddToScales: (state, { payload }) => {
      state.scales = [...state.scales, payload];
      localStorage.setItem('scales', JSON.stringify([...state.scales]));
    },
    actionDeleteFromScales: (state, { payload }) => {
      state.scales = [...state.scales.filter((itemId) => itemId !== payload)];
      localStorage.setItem('scales', JSON.stringify([...state.scales]));
    },
    actionScalesProduct: (state, { payload }) => {
      state.productDataComparison = [...payload];
    },
    actionPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },
    actionServerError: (state, { payload }) => {
      state.serverError = payload;
    },
  },
});
export const {
  actionAddToScales,
  actionDeleteFromScales,
  actionScalesProduct,
  actionPageLoading,
  actionServerError,
} = scalesSlice.actions;

export const toggleScalesProduct = (id) => (dispatch, getState) => {
  const state = getState();
  const scalesProducts = state.scales.scales;
  const isProductInScales = scalesProducts.some((itemId) => itemId === id);

  isProductInScales ? dispatch(actionDeleteFromScales(id)) : dispatch(actionAddToScales(id));
};

export const actionFetchProductScalesByItemNo = (itemNos) => (dispatch) => {
  dispatch(actionPageLoading(true));
  Promise.all(
    itemNos.map(async (itemNo) => {
      const { data } = await axios.get(GET_DETAILS_PRODUCT.replace(':itemNo', itemNo));
      return data;
    }),
  )
    .then((data) => {
      dispatch(actionScalesProduct(data));
      dispatch(actionPageLoading(false));
    })
    .catch(() => {
      dispatch(actionPageLoading(false));
      dispatch(actionServerError(true));
    });
};

export default scalesSlice.reducer;
