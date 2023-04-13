import './FormRegistration.scss';
import { Formik, Form } from 'formik';
import FormikControl from './components/FormikControl'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionEditInputs } from '../../reducers';
import Button from '../Button';
import PasswordInput from './components/PasswordInput';
import EditButton from './components/EditButton';

const FormRegistration = ({ onSubmit, initialValues, btnEdit, inputsEditName, withPassword, validationSchema }) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(isValid) => {
                    return (
                        <>
                            <Form className="form-registration" style={{ width: '100%' }}>
                                <div className="form-registration__grid_wrapper">
                                    <FormikControl
                                        sx={[!inputsEditName.includes("firstName") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        label="First Name"
                                        color="success"
                                        className="form-registration__input"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        disabled={!inputsEditName.includes("firstName")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"firstName"}
                                                onClick={() => dispatch(actionEditInputs("firstName"))} />)
                                        }}
                                        required
                                    />

                                    <FormikControl
                                        sx={[!inputsEditName.includes("lastName") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        color="success"
                                        label="Last Name"
                                        className="form-registration__input"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        disabled={!inputsEditName.includes("lastName")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"lastName"}
                                                onClick={() => dispatch(actionEditInputs("lastName"))} />)
                                        }}
                                        required
                                    />

                                    <FormikControl
                                        sx={[!inputsEditName.includes("login") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        color="success"
                                        label="Login"
                                        className="form-registration__input"
                                        name="login"
                                        placeholder="Enter your login"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        disabled={!inputsEditName.includes("login")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"login"}
                                                onClick={() => dispatch(actionEditInputs("login"))} />)
                                        }}
                                        required
                                    />

                                    <FormikControl
                                        sx={[!inputsEditName.includes("email") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        color="success"
                                        label="Email"
                                        className="form-registration__input"
                                        name="email"
                                        placeholder="Enter your email"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        disabled={!inputsEditName.includes("email")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"email"}
                                                onClick={() => dispatch(actionEditInputs("email"))} />)
                                        }}
                                        required
                                    />

                                    {!withPassword &&
                                        <PasswordInput name={"password"}
                                            placeholder={"Enter your password"}
                                            label={"Enter your password"}
                                            showPassword={showPassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={(e) => e.preventDefault()} />
                                    }
                                    {!withPassword &&
                                        <PasswordInput name={"confirmPassword"}
                                            placeholder={"Confirm password"}
                                            label={"Confirm password"}
                                            showPassword={showRepeatPassword}
                                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                            onMouseDown={(e) => e.preventDefault()} />
                                    }

                                    <FormikControl
                                        sx={[!inputsEditName.includes("telephone") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        color="success"
                                        label="Telephone"
                                        className="form-registration__input"
                                        name="telephone"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        required
                                        placeholder="+380 99 999 99 99"
                                        disabled={!inputsEditName.includes("telephone")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"telephone"}
                                                onClick={() => dispatch(actionEditInputs("telephone"))} />)
                                        }}
                                    />

                                    <FormikControl
                                        sx={[!inputsEditName.includes("city") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        label="City"
                                        color="success"
                                        className="form-registration__input"
                                        name="city"
                                        placeholder="Enter your city"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        disabled={!inputsEditName.includes("city")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"city"}
                                                onClick={() => dispatch(actionEditInputs("city"))} />)
                                        }}

                                    />
                                    <FormikControl
                                        sx={[!inputsEditName.includes("country") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        type="text"
                                        control="input"
                                        label="Country"
                                        color="success"
                                        className="form-registration__input"
                                        name="country"
                                        placeholder="Enter your country"
                                        variant="outlined"
                                        id="outlined-multiline-flexible"
                                        disabled={!inputsEditName.includes("country")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"country"}
                                                onClick={() => dispatch(actionEditInputs("country"))} />)
                                        }}

                                    />

                                    <FormikControl
                                        sx={[!inputsEditName.includes("birthdate") && {
                                            "& fieldset": { border: 'none' }
                                        }]}
                                        id="outlined-multiline-flexible"
                                        name="birthdate"
                                        placeholder="dd.mm.yyyy"
                                        label="Birth date"
                                        type="text"
                                        control="input"
                                        color="success"
                                        className="form-registration__input"
                                        variant="outlined"
                                        disabled={!inputsEditName.includes("birthdate")}
                                        InputProps={btnEdit && {
                                            endAdornment: (<EditButton dataName={"birthdate"}
                                                onClick={() => dispatch(actionEditInputs("birthdate"))} />)
                                        }}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    text="submit"
                                    style={{ display: 'block', margin: '0 auto', marginTop: 60, marginBottom: 50 }}
                                />
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default FormRegistration;