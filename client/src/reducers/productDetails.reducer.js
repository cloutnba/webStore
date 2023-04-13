import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    FILTERED_PRODUCTS,
    GET_DETAILS_PRODUCT,
    PRODUCT_COMMENTS,
    GET_PRODUCT_COMMENTS
} from "../endpoints";

const initialState = {
    pageLoading: false,
    serverError: null,
    productData: {},
    productComments: [],
    similarProducts: [],
    commentError: false,
}

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        actionPageLoading: (state, {payload}) => {
            state.pageLoading = payload
        },
        actionServerError: (state, {payload}) => {
            state.serverError = payload;
        },
        actionProductData: (state, {payload}) => {
            state.productData = {...payload};
        },
        actionProductComments: (state, {payload}) => {
            state.productComments = [...payload];
        },
        actionAddComment: (state, {payload}) => {
            state.productComments = [...state.productComments, payload];
        },
        actionSimilarProduct: (state, {payload}) => {
            state.similarProducts = [...payload];
        },
        actionCommentError: (state, {payload}) => {
            state.commentError = payload;
        }
    }
})
export const {
    actionPageLoading,
    actionServerError,
    actionProductData,
    actionProductComments,
    actionAddComment,
    actionSimilarProduct,
    actionCommentError
} = productDetailsSlice.actions


export const actionFetchOneProduct = itemNo => dispatch => {
    dispatch(actionPageLoading(true));
    return axios.get(GET_DETAILS_PRODUCT.replace(':itemNo', itemNo))
        .then(({data}) => {
            dispatch(actionProductData(data));
            dispatch(actionPageLoading(false));
        })
        .catch(() => dispatch(actionServerError(true)))
}

export const actionFetchAllComments = itemNo => dispatch => {
    return axios
        .get(GET_PRODUCT_COMMENTS.replace(':itemNo', itemNo))
        .then(({data}) => {
            dispatch(actionProductComments(data));
        })
}


export const actionFetchAddComment = newComment => dispatch => {
    dispatch(actionPageLoading(true));
    return axios
        .post(PRODUCT_COMMENTS, newComment)
        .then(({data})=> {
            dispatch(actionAddComment(data));
            dispatch(actionCommentError(false));
            dispatch(actionPageLoading(false));
        })
        .catch(() => {
            dispatch(actionPageLoading(false));
            dispatch(actionCommentError(true))
        })
}

export const actionFetchUpdateComment = (updateComment, id) => dispatch => {
    dispatch(actionPageLoading(true));
    return axios
        .put(`${PRODUCT_COMMENTS}/${id}`, {content : updateComment, date: new Date()})
        .then(()=> {

            dispatch(actionCommentError(false));
            dispatch(actionPageLoading(false));
        })
        .catch(() => {
            dispatch(actionPageLoading(false));
            dispatch(actionCommentError(true))
        })
}

export const actionFetchDeleteComment = (id, itemNo) => dispatch => {
    dispatch(actionPageLoading(true));
    return axios
        .delete(`${PRODUCT_COMMENTS}/${id}`)
        .then(()=> {
            dispatch(actionFetchAllComments(itemNo));
            dispatch(actionCommentError(false));
            dispatch(actionPageLoading(false));
        })
        .catch(() => {
            dispatch(actionPageLoading(false));
            dispatch(actionCommentError(true))
        })
}

export const actionFetchSimilarProducts = filter => dispatch => {
    const stringParams = new URLSearchParams(filter);

    return axios.get(FILTERED_PRODUCTS, {params: stringParams})
        .then(({data}) => {
            dispatch(actionSimilarProduct(data.products));
        })
        .catch(() => dispatch(actionSimilarProduct([])))
}

export default productDetailsSlice.reducer
