import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {GET_USER, LOGIN_USER} from "../endpoints"
import setAuthToken from "../helpers/setAuthToken";

const initialState = {
    userData: {},
    token: localStorage.getItem("token") || '',
    error: null
}

const logInSlice = createSlice({
    name:"logIn",
    initialState,
    reducers: {
        actionToken: (state, {payload}) => {
            localStorage.setItem('token', payload);
            state.token = payload
        },
        actionAuthorizationUser: (state, {payload}) => {
            state.userData = payload
        }, 
        actionError: (state, {payload}) => {
            state.error = payload;
        },
        actionResetLoginError: (state) => {
            state.error = initialState.error;
        }
    }
})

export const {
    actionToken,
    actionAuthorizationUser,
    actionError,
    actionResetLoginError
} = logInSlice.actions

export const actionFetchLogin = (userData) => (dispatch) => {
    return axios.post(LOGIN_USER, userData)
        .then(({ data }) => {
            dispatch(actionError(null))
            dispatch(actionToken(data.token))
            setAuthToken(data.token )
        })
        .catch((err) => {
            if (err.response.status === 404) {
               return dispatch(actionError('NOT_FOUND'))
            }
            if (err.response.status === 400) {
                return dispatch(actionError('BAD_REQUEST'))
            }
            return dispatch(actionError('SERVER_ERROR'))

        });
}

export const actionFetchAuthorizationUser = () => (dispatch) => {
    return axios.get(GET_USER)
        .then(user => {
            dispatch(actionAuthorizationUser(user.data))
        })
}

export default logInSlice.reducer

