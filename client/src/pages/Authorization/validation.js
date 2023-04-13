import * as yup from "yup";

export const validationSchema = yup.object().shape({
    loginOrEmail: yup
        .string("Enter your email or login")
        .required("Field is required")
        .min(3, "Min 3 symbols"),

        password: yup
        .string("Enter your password")
        .required("Password is required")
        .min(7, "Min 7 symbols")
        .max(20, 'Max 20 symbols')
        .matches(/^[a-zA-Z0-9]+$/, 'Allowed characters for password is a-z, A-Z, 0-9'),
})
