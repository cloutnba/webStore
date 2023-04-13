import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDERS } from "../endpoints";

const initialState = {
    isOrdered: false,
    serverError: null,
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        actionIsOrdered: (state, {payload}) => {
            state.isOrdered = payload;
        },
        actionServerError: (state, { payload }) => {
            state.serverError = payload;
        },
    }
})

export const {
    actionIsOrdered,
    actionServerError
} = checkoutSlice.actions;


export const actionFetchCreateOrder = (newOrder) =>  (dispatch) => {
    return axios.post(ORDERS, newOrder)
        .then((newOrder) => {
            
            dispatch(actionIsOrdered(true));
            dispatch(actionServerError(false));
        })
        .catch(() => {
        dispatch(actionServerError(true));
    });
}

export default checkoutSlice.reducer;
