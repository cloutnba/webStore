import { configureStore } from '@reduxjs/toolkit';

import {
    productsReducer,
    favoritesReducer,
    scalesReducer,
    basketReducer,
    logInReducer,
    productDetailsReducer,
    discountedProductsReducer,
    checkoutReducer,
    personalOfficeReducer,
    registrationReducer
} from "../reducers";


const store = configureStore({
    reducer:{
        products: productsReducer,
        productsDetails: productDetailsReducer,
        favorites: favoritesReducer,
        scales: scalesReducer,
        basket: basketReducer,
        logIn: logInReducer,
        discountedProducts: discountedProductsReducer,
        checkout: checkoutReducer,
        personalOffice: personalOfficeReducer,
        registration: registrationReducer,
    }

})

export default store;
