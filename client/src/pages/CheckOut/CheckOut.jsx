import './CheckOut.scss';
import { Box, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import BreadCrumbs from '../../components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectorBasket,
  selectorBasketProduct,
  selectorIsOrdered,
  selectorToken,
  selectorUserData,
} from '../../selectors';
import { actionFetchCreateOrder, deleteUserCart } from '../../reducers';
import OrderedSuccessful from './components/OrderedSuccessful';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { validationSchema } from './validationShema';
import { letterHtml } from '../Authorization/letterHtml';

const CheckOut = () => {
  const productBasket = useSelector(selectorBasketProduct);
  const navigate = useNavigate();
  const isOrdered = useSelector(selectorIsOrdered);
  const basketProduct = useSelector(selectorBasketProduct);
  const basket = useSelector(selectorBasket);
  const token = useSelector(selectorToken);
  const user = useSelector(selectorUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (basket.length === 0) {
      navigate('/');
    }
  },[]);

  const deleteBasket = () => {
    dispatch(deleteUserCart())
  }

  const formik = useFormik({
    initialValues: {
      firstName: token ? user.firstName : '',
      lastName: token ? user.lastName : '',
      phone: token ? user.telephone : '',
      email: token ? user.email : '',
      country: '',
      city: '',
      address: '',
      postalCode: '',
      comments: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const products = productBasket.map((product) => {
        return {
          product,
          _id: product.itemNo,
          cartQuantity: product.cartQuantity,
        };
      });

      const newOrder = {
        products: products,
        customerId: user._id,
        deliveryAddress: {
          country: values.country,
          city: values.city,
          address: values.address,
          postal: values.postalCode,
        },
        email: values.email,
        mobile: values.phone,

        letterSubject: 'Thank you for order! You are welcome!',
        letterHtml: letterHtml(),
      };

      dispatch(actionFetchCreateOrder(newOrder, basketProduct));
      deleteBasket();
    },
  });

  return (
    <>
      {!isOrdered ? (
        <Box className="checkout">
          <Container maxWidth="lg" className="checkout__container">
            <BreadCrumbs
              linksArray={[
                { link: '/basket', text: 'Cart' },
                { link: '/checkout', text: 'Checkout' },
              ]}
            />
            <h3 className="checkout__title">
              Check<span className="title_contrast">out</span>
            </h3>
            <form onSubmit={formik.handleSubmit} className="checkout__form">
              <TextField
                className="checkout__input"
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="Phone"
                id="phone"
                name="phone"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="Email"
                id="email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="Country"
                id="country"
                name="country"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="City"
                id="city"
                name="city"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="Address"
                id="address"
                name="address"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                color="success"
              />

              <TextField
                className="checkout__input"
                label="Postal code"
                id="postalCode"
                name="postalCode"
                type="text"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
                color="success"
              />

              <Button type="submit" text="Create order" className="checkout__submit-btn" />
            </form>
          </Container>
        </Box>
      ) : (
        <OrderedSuccessful />
      )}
    </>
  );
};

export default CheckOut;
