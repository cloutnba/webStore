
import { Formik, Form } from 'formik';
import validationSchemaPassword from './compomemts/ValidationSchemaPassword';
import { useState } from 'react';
import { selectorChangePasswordMessage } from '../../../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import PasswordInput from '../../../../components/FormRegistration/components/PasswordInput'
import { actionFetchUpdateCustomerPassword } from '../../../../reducers';

import './ChangePassword.scss'


const ChangePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const dispatch = useDispatch()

    
    const changePasswordMessage = useSelector(selectorChangePasswordMessage)

    return (
            <Formik
                initialValues={{
                    password: '',
                    newPassword: ''}} 
                validationSchema={validationSchemaPassword}
                onSubmit={(values)=>{
                    delete values.confirmNewPassword
                     dispatch(actionFetchUpdateCustomerPassword(values)) }  
                } 
            >
                {(isValid) => {
                    return (
                        <>
                            <Form className="form-registration" style={{ width: '100%' }}>
                                <div className="change-password-form">
                                    <PasswordInput
                                        label={"Old password"}
                                        name={"password"}
                                        placeholder="Enter your old password"
                                        type={showOldPassword ? 'text' : 'password'}
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        onMouseDown={(e) => e.preventDefault()} 
                                        showPassword={showOldPassword} />

                                    <PasswordInput
                                        label={"New password"}
                                        name={"newPassword"}
                                        placeholder="Enter your new password"
                                        type={showNewPassword ? 'text' : 'password'}
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                         onMouseDown={(e) => e.preventDefault()} 
                                        showPassword={showNewPassword} />

                                    <PasswordInput
                                        label={"Confirm new passwor"}
                                        name={"confirmNewPassword"}
                                        placeholder="Confirm new passwor"
                                        type={showConfirmNewPassword ? 'text' : 'password'}
                                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                        onMouseDown={(e) => e.preventDefault()} 
                                        showPassword={showConfirmNewPassword} />  
                                </div>
                                <p className='change-password-message'>{changePasswordMessage}</p>
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    text="Change password"
                                    style={{ display: 'block', margin: '0 auto', marginTop: 30, marginBottom: 40 }}
                                />
                            </Form>
                        </>
                    );
                }}
            </Formik>
    )
}

export default ChangePassword