import Modal from "../../components/Modal";
import AuthInput from "./components/AuthInput";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Formik, Form } from "formik";
import {validationSchema} from "./validation";
import Button from "../../components/Button";
import {actionFetchLogin, actionResetLoginError, actionCheckCart, getProductsCart, actionCheckFavorites, getProductsFavorites} from "../../reducers"
import { useDispatch, useSelector } from "react-redux";
import {selectorAllLoginErrors, selectorUserData} from "../../selectors";
import {useState} from "react";
import './Authorization.scss';
import store from "../../store"
import {useNavigate} from "react-router-dom";

const Authorization = ({closeModalAuth}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(selectorUserData);
    const error = useSelector(selectorAllLoginErrors);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const getErrorMassage = (errorCode) => {
        switch (errorCode) {
            case "NOT_FOUND": return "This user is not registered yet";
            case "BAD_REQUEST": return "Password incorrect";
            case "SERVER_ERROR": return "The system is currently experiencing difficulties; please try again.";
            default: return "The system is currently experiencing difficulties; please try again.";
        }
    }

    const handleSubmit = async (values) => {
        await dispatch(actionFetchLogin(values))
        const state = store.getState()
        const error = state.logIn.error;

        if(!error) {
            closeModalAuth();
            dispatch(actionResetLoginError());
            dispatch(actionCheckCart());
            dispatch(getProductsCart());
            dispatch(actionCheckFavorites());
            dispatch(getProductsFavorites());
            navigate("/products");
        }
    }

    return (
        <Modal
        modalAction={closeModalAuth}
        closeAction={() => {
            closeModalAuth();
            dispatch(actionResetLoginError())
        }}>
            <Formik
          initialValues={userData}
          onSubmit={ (values) => handleSubmit(values) }
          validationSchema={validationSchema}
        >
          {(isValid) => {
            return (
            <Form>
              <div className="form-block">
                <h1 className="form-block__title">Log In to your account</h1>
                  {
                      error &&
                        <p className="form-block__error-notification">{ getErrorMassage(error) }</p>
                  }
                <AuthInput
                  type="text"
                  control="input"
                  color="success"
                  label="Email or Login"
                  className="form-block__input"
                  name="loginOrEmail"
                  placeholder="Enter your email or login"
                  variant="outlined"
                  id="outlined-multiline-flexible"
                  required
                />
                <AuthInput
                htmlFor="outlined-adornment-password"
                label="Password"
                variant="outlined"
                control="input"
                color="success"
                className="form-block__input"
                name="password"
                placeholder="Enter your password"
                id="outlined-adornment-password"
                required
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}

                />
                {/* <p className="login_reminder" onClick={() => console.log("reminder")}>Forgot your password?</p> */}
                <Button className="form-block__btn" type="submit" text="LogIn" disabled={!isValid}/>
                <Button className="form-block__btn" type="button" to="/registration" text="Registration" variant="white-shadow" onClick={closeModalAuth}/>
                </div>
            </Form>
          )}}
        </Formik>

        </Modal>
    )
}

export default Authorization;
