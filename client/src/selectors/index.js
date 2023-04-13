// ALL PRODUCTSsortByPrise
export const selectorAllProducts = (state) => state.products.allProducts;
export const selectorSearchInputValue = (state) => state.products.searchInputValue;
export const selectorServerErrorProducts = (state) => state.products.serverError;
export const selectorSortByPrise = (state) => state.products.sortByPrise;
export const selectorFilterRequest = (state) => state.products.filterRequest;
export const selectorProductsQuantity = (state) => state.products.productsQuantity;
export const selectorPageLoading = (state) => state.products.pageLoading;
export const selectorUrlAddress = (state) => state.products.urlAddress;
export const selectorFirstVisitAndResetToCorectFilter = (state) => state.products.firstVisitAndResetToCorectFilter
export const selectorShowPaginaton = (state) => state.products.showPaginaton

// PRODUCT DETAILS
export const selectorProduct = (state) => state.productsDetails.productData;
export const selectorSimilarProducts = (state) => state.productsDetails.similarProducts;
export const selectorServerErrorProductDetails = (state) => state.productsDetails.serverError;
export const selectorIsDetailsProductLoading = (state) => state.productsDetails.pageLoading;

// ALL COMMENTS
export const selectorProductComments = (state) => state.productsDetails.productComments;
export const selectorCommentError = (state) => state.productsDetails.commentError;

// PRODUCTS IN BASKET
export const selectorBasket = (state) => state.basket.basket;
export const selectorBasketProduct = (state) => state.basket.basketProduct;
export const selectorServerErrorBasket = (state) => state.basket.serverError;
export const selectorIsBasketLoading = (state) => state.basket.pageLoading;

// CHECKOUT
export const selectorIsOrdered = (state) => state.checkout.isOrdered;
export const selectorServerErrorCheckout = (state) => state.checkout.serverError;

// PRODUCTS IN SCALES
export const selectorScales = (state) => state.scales.scales;
export const selectorProductComparison = (state) => state.scales.productDataComparison;
export const selectorIsScalesPageLoading = (state) => state.scales.pageLoading;
export const selectorServerErrorScalesPage = (state) => state.scales.serverError;

// FAVORITES PRODUCTS
export const selectorFavorites = (state) => state.favorites.favorites;
export const selectorFavoritesProduct = (state) => state.favorites.favoritesProduct;
export const selectorIsFavoritesPageLoading = (state) => state.favorites.pageLoading;
export const selectorServerErrorFavoritesPage = (state) => state.favorites.serverError;

// PERSONAL OFFICE
export const selectorUserInfo = state => state.personalOffice.userInfo
export const selectorEditInputs = state => state.personalOffice.editInputs 
export const selectorChangePasswordMessage = state => state.personalOffice.changePasswordMessage
export const selectorPageLoadingPersonalOffice = state => state.personalOffice.pageLoading 
export const selectorAllUserOrders = state => state.personalOffice.allUserOrders 
export const selectorEditInputsOrder = state => state.personalOffice.editInputsOrder
export const selectorOrderInfo = state => state.personalOffice.orderInfo
export const selectorServerErrorPersonalOffice = state => state.personalOffice.serverError

/* export const selectoRequestObj = state => state.app.requestObj */
// LOGIN
export const selectorAllLoginErrors = (state) => state.logIn.error;
export const selectorUserData = (state) => state.logIn.userData;
export const selectorToken = (state) => state.logIn.token;

// DISCOUNTED PRODUCTS
export const selectorDiscountedProducts = (state) => state.discountedProducts.discountedProducts;

// //REGISTRATION
export const selectorRegistrationIsLoading = (state) => state.registration.pageIsLoading;
export const selectorRegistrationModalSuccess = (state) => state.registration.modalSuccess;
export const selectorRegistrationModalError = (state) => state.registration.modalError;
export const selectorRegistrationInitialState = (state) => state.registration.formData;
export const selectorRegistrationMessageError = (state) => state.registration.messageError;




