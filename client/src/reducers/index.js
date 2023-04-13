import productsReducer, {
  actionFetchAllProducts,
  actionProductsQuantity,
  actionSortByPrise,
  actionPageLoading,
  actionFetchSearchFilterProducts,
  actionSearchInputValue,
  actionAllProducts,
  actionFetchSearchProducts,
  actionUrlAddress,
  actionFilterRequest,
  actionFirstVisitAndResetToCorectFilter
} from './products.reducer';
import favoritesReducer, {
  actionAddToFavorites,
  actionDeleteFromFavorites,
  toggleFavoriteProduct,
  actionUpdateFavorites,
  actionFavoritesProductNew,
  actionFetchAddUserFavorites,
  actionCheckFavorites,
  getProductsFavorites,
  actionAddProductToFavorites,
  actionDeleteProductFromFavorites,
} from './favorites.reducer';
import scalesReducer, {
  actionAddToScales,
  actionDeleteFromScales,
  toggleScalesProduct,
  actionFetchProductScalesByItemNo,
} from './scales.reducer';
import basketReducer, {
  actionAddToBasket,
  actionDeleteFromBasket,
  actionBasketProductNew,
  actionDecraese,
  actionFetchAddUserCart,
  actionAddProductToBasket,
  actionDeleteProductFromBasket,
  actionDeleteAllFromBasket,
  actionUpdateBasket,
  actionCheckCart,
  getProductsCart,
  deleteUserCart
} from "./basket.reducer";
import logInReducer, {
  actionFetchLogin,
  actionToken,
  actionFetchAuthorizationUser,
  actionResetLoginError,
  actionAuthorizationUser,
} from './logIn.reducer';
import productDetailsReducer, {
  actionFetchOneProduct,
  actionFetchAddComment,
  actionFetchAllComments,
  actionFetchDeleteComment,
  actionFetchUpdateComment
} from './productDetails.reducer';
import discountedProductsReducer, {
  actionDiscountedProducts,
  actionFetchDiscountedProducts,
} from './discountedProducts.reducer';
import checkoutReducer, {
  actionFetchCreateOrder,
  actionIsOrdered
} from './checkout.reducer';
import personalOfficeReducer, {
    actionUserInfo, 
    actionFetchUserInfo, 
    actionEditInputsOrder,
    actionEditInputs,
    actionFetchUpdateCustomer,
    actionFetchUpdateCustomerPassword,
    actionChangePasswordMessage,
    actionFetchAllUserOrders,
    actionFetchCancelOrder,
    actionFetchGetOneOrder,
    actionFetchUpdatedOrder,
} from "./personalOffice.reducer";
import registrationReducer, {
  createCustomerServerApi,
  actionRegistrationSuccess,
  actionPageIsLoading,
  actionRegistrationError,
  initialState,
  actionMessageError
} from './registration.reducer';

export {
  productsReducer,
  actionFilterRequest,
  actionFetchAllProducts,
  actionProductsQuantity,
  actionSortByPrise,
  actionPageLoading,
  actionFirstVisitAndResetToCorectFilter,
  actionUrlAddress,
  actionFetchSearchProducts,
  actionFetchSearchFilterProducts,
  actionSearchInputValue,
  actionAllProducts,
  favoritesReducer, 
  actionAddToFavorites,
  actionDeleteFromFavorites,
  toggleFavoriteProduct,
  actionUpdateFavorites,
  actionFavoritesProductNew,
  actionFetchAddUserFavorites,
  actionCheckFavorites,
  getProductsFavorites,
  actionAddProductToFavorites,
  actionDeleteProductFromFavorites,
  basketReducer,
  actionAddToBasket,
  actionDeleteFromBasket,
  actionBasketProductNew,
  actionDecraese,
  actionFetchAddUserCart,
  actionAddProductToBasket,
  actionDeleteProductFromBasket,
  actionDeleteAllFromBasket,
  actionUpdateBasket,
  getProductsCart,
  actionCheckCart,
  deleteUserCart, 
  scalesReducer,
  actionAddToScales,
  actionDeleteFromScales,
  toggleScalesProduct,
  actionFetchProductScalesByItemNo,
  logInReducer,
  actionFetchLogin,
  actionResetLoginError,
  actionFetchAuthorizationUser,
  actionAuthorizationUser,
  actionToken,
  productDetailsReducer,
  actionFetchOneProduct,
  actionFetchAddComment,
  actionFetchAllComments,
  actionFetchDeleteComment,
  actionFetchUpdateComment,
  discountedProductsReducer,
  personalOfficeReducer,
  actionDiscountedProducts,
  actionFetchDiscountedProducts,
  actionUserInfo, 
  actionFetchUserInfo, 
  actionEditInputs,
  actionFetchUpdateCustomer,
  actionEditInputsOrder,
  actionFetchCancelOrder,
  actionFetchAllUserOrders,
  actionFetchUpdateCustomerPassword,
  actionChangePasswordMessage,
  actionFetchGetOneOrder,
  actionFetchUpdatedOrder,
  checkoutReducer, 
  actionFetchCreateOrder,
  actionIsOrdered,
  registrationReducer,
  createCustomerServerApi,
  actionRegistrationSuccess,
  actionPageIsLoading,
  actionRegistrationError,
  initialState,
  actionMessageError
};
