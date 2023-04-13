import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please, enter your first name'),
    lastName: Yup.string().required('Please, enter your last name'),
    phone: Yup.string()
        .matches(/^\+?\d{10,12}$/, 'Please, enter correct phone number')
        .required('Please, enter correct phone number'),
    email: Yup.string()
        .email('Please, enter correct email')
        .required('Please, enter correct email'),
    country: Yup.string().required('Please, enter your country'),
    city: Yup.string().required('Please, enter your city'),
    address: Yup.string().required('Please, enter your address'),
    postalCode: Yup.string().required('Please, enter your postal code'),
    comments: Yup.string()
})
