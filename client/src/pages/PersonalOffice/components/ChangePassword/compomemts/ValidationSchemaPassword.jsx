import * as yup from 'yup';

const validationSchemaPassword = yup.object().shape({
  password: yup
    .string()
    .required('No password provided')
    .min(7, 'Password is too short - should be 8 chars minimum')
    .max(30, 'Password is too long - should be 30 chars maximum')
    .matches(/^[a-zA-Z0-9]+$/, 'Allowed characters for password is a-z, A-Z, 0-9'),

    newPassword: yup
    .string()
    .required('No password provided')
    .min(7, 'Password is too short - should be 8 chars minimum')
    .max(30, 'Password is too long - should be 30 chars maximum')
    .matches(/^[a-zA-Z0-9]+$/, 'Allowed characters for password is a-z, A-Z, 0-9'),

    confirmNewPassword: yup.string().when('newPassword', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('newPassword')], 'Both password need to be the same'),
    }),
});

export default validationSchemaPassword;
