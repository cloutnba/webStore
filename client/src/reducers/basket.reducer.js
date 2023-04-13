import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  SHOPPING_CART,
  PRODUCT_IN_SHOPPING_CART,
  CHANGE_PRODUCT_QUANTITY_SHOPPING_CART,
  GET_DETAILS_PRODUCT,
} from '../endpoints';

import setAuthToken from '../helpers/setAuthToken';

const initialState = {
  basket: JSON.parse(localStorage.getItem('basket')) || [], // массив в виде [product: id, cartQuantity: 1 ]
  basketProduct: [], // массив с продуктами со всеми деталями
  serverError: null,
  pageLoading: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    actionAddToBasket: (state, { payload }) => {
      const id = Object.values(payload._id).join('');
      const itemIndex = state.basket.findIndex((item) => item.product === id);

      if (itemIndex !== -1) {
        state.basket[itemIndex].cartQuantity += 1;
      } else {
        const newItem = { product: id, cartQuantity: 1 };
        state.basket = [...state.basket, newItem];
      }

      localStorage.setItem('basket', JSON.stringify([...state.basket]));
    },

    actionUpdateBasket: (state, { payload }) => {
      const newItems = payload.map((item) => {
        return {
          product: item.product._id,
          cartQuantity: item.cartQuantity,
        };
      });
      state.basket = newItems;
    },

    actionDeleteFromBasket: (state, { payload }) => {
      state.basket = [...state.basket.filter(({ product }) => product !== payload._id)];
      localStorage.setItem('basket', JSON.stringify([...state.basket]));
    },

    actionBasketProductNew: (state, { payload }) => {
      state.basketProduct = payload;
    },

    actionDecraese: (state, { payload }) => {
      const basket = JSON.parse(JSON.stringify([...state.basket]));
      const update = basket.map((item) => {
        if (item.product === payload._id) {
          if (item.cartQuantity > 1)
            return {
              ...item,
              cartQuantity: item.cartQuantity - 1,
            };
        }
        return item;
      });
      localStorage.setItem('basket', JSON.stringify(update));
      return { ...state, basket: update };
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
  actionAddToBasket,
  actionDeleteFromBasket,
  actionBasketProductNew,
  actionDecraese,
  actionPageLoading,
  actionServerError,
  actionUpdateBasket,
} = basketSlice.actions;

// ADD NEW CART

export const actionFetchAddUserCart = (newCart) => (dispatch) => {
   const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
   setAuthToken(token);
   axios.post(SHOPPING_CART, newCart)
    .catch(() => {
      dispatch(actionPageLoading(false));
      dispatch(actionServerError(true));
    });

};

// C H E C K   C A R T

export const actionCheckCart = () => (dispatch) => {
  const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
  const basket = initialState.basket;
  if (token) {
    setAuthToken(token);
    axios.get(SHOPPING_CART).then(({ data }) => {
      if (data === null) {
        if (basket.length > 0) {
          const newCart = {
            products: basket.map((item) => {
              return {
                product: item.product,
                cartQuantity: item.cartQuantity,
              };
            }),
          };
          dispatch(actionFetchAddUserCart(newCart));
          localStorage.removeItem('basket');
        } else {
          return null;
        }
      } else {
        const newData = data.products.map((item) => {
          return {
            ...item.product,
            cartQuantity: item.cartQuantity,
          };
        });
        dispatch(actionBasketProductNew(newData));
        dispatch(actionUpdateBasket(data.products));
        localStorage.removeItem('basket');
      }
    })
    .catch(() => {
      dispatch(actionPageLoading(false));
      dispatch(actionServerError(true));
    });
  }
};

////////////////
// G E T   P R O D U C T

export const getProductsCart = () => (dispatch) => {
  dispatch(actionPageLoading(true))
  const token = localStorage.getItem('token');
  if (token !== null && token !== undefined && token !== '') {
    setAuthToken(token);
    axios
      .get(SHOPPING_CART).then(({ data }) => {
        if (data) {
          const newData = data.products?.map((item) => {
            return {
              ...item.product,
              cartQuantity: item.cartQuantity,
            };
          });
          dispatch(actionBasketProductNew(newData));
          dispatch(actionPageLoading(false))
        } else {
          dispatch(actionPageLoading(false))
          return null;
        }
      })
      .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
  } else {
    const basketProducts = JSON.parse(localStorage.getItem('basket')) || [];

    if (basketProducts.length > 0) {
      const promises = basketProducts.map(async (item) => {
        const { data } = await axios.get(GET_DETAILS_PRODUCT.replace(':itemNo', item.product));

        return { ...data, cartQuantity: item.cartQuantity };
      });
      Promise.all(promises)
        .then((data) => {
          dispatch(actionBasketProductNew(data));
          dispatch(actionPageLoading(false))
        })
        .catch(() => {
          dispatch(actionPageLoading(false));
          dispatch(actionServerError(true));
        });
    } else {
      dispatch(actionPageLoading(false))
    }
  }
};

// A D D / I N C R E A S E   P R O D U C T   T O   C A R T

export const actionAddProductToBasket = (item) => (dispatch) => {
  dispatch(actionPageLoading(true))
  const token = localStorage.getItem('token');
  setAuthToken(token);
  if (token) {
    axios
      .put(PRODUCT_IN_SHOPPING_CART.replace(':productId', item._id), null)
      .then(({ data }) => {
        dispatch(actionUpdateBasket(data.products));
        dispatch(actionPageLoading(false))
      })
      .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
  } else {
    dispatch(actionAddToBasket(item));
    dispatch(actionPageLoading(false))
  }
};

// D E C R E A S E   P R O D U C T   I N   C A R T

export const actionDeleteProductFromBasket = (item) => (dispatch) => {
  dispatch(actionPageLoading(true))
  const token = localStorage.getItem('token');
  setAuthToken(token);
  if (token) {
    axios
      .delete(CHANGE_PRODUCT_QUANTITY_SHOPPING_CART.replace(':productId', item._id))
      .then(({ data }) => {
        dispatch(actionUpdateBasket(data.products));
        dispatch(actionPageLoading(false))
      })
      .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
  } else {
    dispatch(actionDecraese(item));
    dispatch(actionPageLoading(false))
  }
};

// D E L E T E   P R O D U C T S   F R O M  C A R T

export const actionDeleteAllFromBasket = (item) => (dispatch) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  if (token) {
    dispatch(actionPageLoading(true))
    axios
      .delete(PRODUCT_IN_SHOPPING_CART.replace(':productId', item._id))
      .then(({ data }) => {
        dispatch(actionUpdateBasket(data.products));
        dispatch(actionPageLoading(false))
      })
      .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
  } else {
    dispatch(actionDeleteFromBasket(item));
  }
};

/// D E L E T E    C A R T

export const deleteUserCart = () => (dispatch) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  axios.delete(SHOPPING_CART)
  .catch(() => {
    dispatch(actionPageLoading(false));
    dispatch(actionServerError(true));
  });
}

export default basketSlice.reducer;
