import { createSlice } from '@reduxjs/toolkit';
import { REGISTER_USER } from '../../src/endpoints/index';
import axios from 'axios';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        formData: {
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        telephone: '',
        city:'',
        country:'',
        birthdate: '',
        },
        modalError: null,
        modalSuccess: null,
        pageIsLoading: false,
        messageError: ""
    },
    reducers: {
        actionPageIsLoading:  (state, { payload }) => {
            state.pageIsLoading = payload;
        },
        actionRegistrationSuccess: (state, { payload }) => {
            state.modalSuccess = payload;
        },
        actionRegistrationError: (state, { payload }) => {
            state.modalError = payload;
        },
        actionMessageError: (state, { payload }) => {
            state.messageError = payload;
        },

    },
});

export const { actionRegistrationSuccess, actionPageIsLoading, actionRegistrationError, actionMessageError} = registrationSlice.actions;

export const createCustomerServerApi  = (value) => (dispatch) => {
    dispatch(actionPageIsLoading(true));
    return axios
        .post(REGISTER_USER, value)
        .then((savedCustomer) => {
            dispatch(actionRegistrationSuccess(true));
            return savedCustomer;
        })
        .catch((error) => {
            dispatch(actionMessageError(error.response.data.message))
            dispatch(actionRegistrationError(true))
        }).finally(()=>{
            dispatch(actionPageIsLoading(false))
        })


};


export const initialState = registrationSlice.getInitialState();
export default registrationSlice.reducer;