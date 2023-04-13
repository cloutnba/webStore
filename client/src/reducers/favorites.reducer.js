import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {
    GET_DETAILS_PRODUCT,
    PRODUCT_IN_WISHLIST,
    WISHLIST,
} from "../endpoints";
import setAuthToken from '../helpers/setAuthToken';


const initialState = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    favoritesProduct: [],
    serverError: null,
    pageLoading: false
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        actionAddToFavorites: (state, {payload}) => {
            state.favorites = [...state.favorites, payload];
            localStorage.setItem("favorites", JSON.stringify([...state.favorites]));
        },
        actionDeleteFromFavorites: (state, {payload}) => {
            state.favorites = [...state.favorites.filter(itemId => itemId !== payload)];
            localStorage.setItem("favorites", JSON.stringify([...state.favorites]));
        },
        actionFavoritesProductNew: (state, { payload }) => {
            state.favoritesProduct = [...payload];
        },
        actionUpdateFavorites: (state, { payload }) => {
          const newItems = payload.map((item) => {
            return (
              item._id
              );
          });
            state.favorites = newItems;

        },
        actionPageLoading: (state, { payload }) => {
            state.pageLoading = payload;
        },
        actionServerError: (state, { payload }) => {
            state.serverError = payload;
        },
    }
})
export const {
    actionAddToFavorites,
    actionDeleteFromFavorites,
    actionFavoritesProductNew,
    actionUpdateFavorites,
    actionPageLoading,
    actionServerError
} = favoritesSlice.actions;

export const toggleFavoriteProduct = id => (dispatch, getState) => {
    const state = getState();
    const favoriteProducts = state.favorites.favorites;
    const isFavoriteProduct = favoriteProducts.some(itemId => itemId === id);

  const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
  if (token) {
     isFavoriteProduct
        ? dispatch(actionDeleteProductFromFavorites(id))
        : dispatch(actionAddProductToFavorites(id))
  } else{
    isFavoriteProduct
        ? dispatch(actionDeleteFromFavorites(id))
        : dispatch(actionAddToFavorites(id))
  }
}


export const actionFetchProductFavoritesByItemNo = (itemNos) =>  (dispatch) => {
    dispatch(actionPageLoading(true));
    Promise.all(itemNos.map(async (itemNo) => {
        const { data } = await axios.get(GET_DETAILS_PRODUCT.replace(':itemNo',itemNo));
        return data;
    }))
        .then( data => {
            dispatch(actionFavoritesProductNew(data));
            dispatch(actionPageLoading(false));
        })
        .catch(() => {
            dispatch(actionPageLoading(false));
            dispatch(actionServerError(true));
        });
    }

export const actionFetchAddUserFavorites = (newFavorites) => (dispatch) => {
   const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
   setAuthToken(token);
   axios.post(WISHLIST, newFavorites)
    .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
};

export const actionCheckFavorites = () => (dispatch) => {
  const token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
  const favorites = initialState.favorites;
  if (token) {
    setAuthToken(token);
    axios.get(WISHLIST).then(({ data }) => {
      if (data === null) {
        if (favorites.length > 0) {
          const newFavorites = favorites.map((item) => {
              return {
                products: [item]
              };
            })
          ;
          dispatch(actionFetchAddUserFavorites(newFavorites));
          localStorage.removeItem('favorites');
        } else {
          return null;
        }
      }
      else {
        const newData = data.products.map((item) => {
          return {
            ...item
        };
        });

        dispatch(actionFavoritesProductNew(newData));
        dispatch(actionUpdateFavorites(data.products));
        localStorage.removeItem('favorites');
      }
    });
  }
};

export const getProductsFavorites = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token !== null && token !== undefined && token !== '') {
    dispatch(actionPageLoading(true));
    setAuthToken(token);
    axios
      .get(WISHLIST).then(({ data }) => {
        if (data) {
          const newData = data.products?.map((item) => {
           return (
              item
           );
          });
          dispatch(actionFavoritesProductNew(newData));
          dispatch(actionPageLoading(false));
        } else {
          dispatch(actionPageLoading(false));
          return null;
        }
      });
  } else {
      const favoriteProducts = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favoriteProducts.length > 0) {
      dispatch(actionFetchProductFavoritesByItemNo(favoriteProducts))
    }
  }
};

export const actionAddProductToFavorites = (item) => (dispatch) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  if (token) {
    axios
      .put(PRODUCT_IN_WISHLIST.replace(':productId', item ))
      .then(({ data }) => {
        if(data){
          dispatch(actionAddToFavorites(item))
        localStorage.removeItem('favorites');
          dispatch(actionUpdateFavorites(data.products));
        }
      })
      .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
  } else {
    dispatch(actionAddToFavorites(item));
  }
};

export const actionDeleteProductFromFavorites = (item) => (dispatch) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  if (token) {
    dispatch(actionPageLoading(true));
    axios
      .delete(PRODUCT_IN_WISHLIST.replace(':productId', item))
      .then(({ data }) => {
        if(data){
          dispatch(actionDeleteFromFavorites(item))
          localStorage.removeItem('favorites');
          dispatch(actionUpdateFavorites(data.products));
          dispatch(actionPageLoading(false));
        }
      })
      .catch(() => {
        dispatch(actionPageLoading(false));
        dispatch(actionServerError(true));
      });
  } else {
    dispatch(actionDeleteFromFavorites(item));
  }
};


export const deleteUserWishlist = () => (dispatch) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  axios.delete(WISHLIST)
  .catch(() => {
    dispatch(actionPageLoading(false));
    dispatch(actionServerError(true));
  });
}


export default favoritesSlice.reducer;
