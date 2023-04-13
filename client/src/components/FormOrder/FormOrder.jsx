import { Formik, Form } from 'formik';
import FormikControl from '../FormRegistration/components/FormikControl';
import EditButton from '../FormRegistration/components/EditButton';
import { useDispatch } from 'react-redux';
import { actionEditInputsOrder } from '../../reducers';
import Button from '../Button';
import  validationSchemaForOrder from './components/validationShemaForOrder'

const FormOrder = ({initialValues, validationSchema, onSubmit, btnEdit, inputsEditName})=>{
        const dispatch = useDispatch()

    return (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={ validationSchemaForOrder}
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
                          endAdornment: (<EditButton dataName={"firstName"} onClick={() => dispatch(actionEditInputsOrder("firstName"))} />)
                        }}
                     /*    required */
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
                          endAdornment: (<EditButton dataName={"lastName"} onClick={() => dispatch(actionEditInputsOrder("lastName"))} />)
                        }}
                     /*    required */
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
                          endAdornment: (<EditButton dataName={"email"} onClick={() => dispatch(actionEditInputsOrder("email"))} />)
                        }}
                        required 
                      />
    
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
                        // placeholder="Enter your telephone"
                        variant="outlined"
                        id="outlined-multiline-flexible"
                        required 
                        placeholder="+380 99 999 99 99"
                        disabled={!inputsEditName.includes("telephone")}
                        InputProps={btnEdit && {
                          endAdornment: (<EditButton dataName={"telephone"} onClick={() => dispatch(actionEditInputsOrder("telephone"))} />)
                        }}
                      />
    
                    
                      <FormikControl
                        sx={[!inputsEditName.includes("country") && {
                          "& fieldset": { border: 'none' }
                        }]}
                        type="text"
                        control="input"
                        color="success"
                        label="Country"
                        className="form-registration__input"
                        name="country"
                        placeholder="Enter your country"
                        variant="outlined"
                        id="outlined-multiline-flexible"
                        disabled={!inputsEditName.includes("country")}
                        InputProps={btnEdit && {
                          endAdornment: (<EditButton dataName={"country"} onClick={() => dispatch(actionEditInputsOrder("country"))} />)
                        }}
                      />

                      <FormikControl
                        sx={[!inputsEditName.includes("city") && {
                          "& fieldset": { border: 'none' }
                        }]}
                        type="text"
                        control="input"
                        color="success"
                        label="City"
                        className="form-registration__input"
                        name="city"
                        placeholder="Enter your city"
                        variant="outlined"
                        id="outlined-multiline-flexible"
                        disabled={!inputsEditName.includes("city")}
                        InputProps={btnEdit && {
                          endAdornment: (<EditButton dataName={"city"} onClick={() => dispatch(actionEditInputsOrder("city"))} />)
                        }}
                        required
                      />

                     <FormikControl
                        sx={[!inputsEditName.includes("address") && {
                          "& fieldset": { border: 'none' }
                        }]}
                        type="text"
                        control="input"
                        color="success"
                        label="Address"
                        className="form-registration__input"
                        name="address"
                        placeholder="Enter your address"
                        variant="outlined"
                        id="outlined-multiline-flexible"
                        disabled={!inputsEditName.includes("address")}
                        InputProps={btnEdit && {
                          endAdornment: (<EditButton dataName={"address"} onClick={() => dispatch(actionEditInputsOrder("address"))} />)
                        }}
                        required
                      />

                     <FormikControl
                        sx={[!inputsEditName.includes("postalCode") && {
                          "& fieldset": { border: 'none' }
                        }]}
                        type="text"
                        control="input"
                        color="success"
                        label="Postal code"
                        className="form-registration__input"
                        name="postalCode"
                        placeholder="Enter your postal code"
                        variant="outlined"
                        id="outlined-multiline-flexible"
                        disabled={!inputsEditName.includes("postalCode")}
                        InputProps={btnEdit && {
                          endAdornment: (<EditButton dataName={"postalCode"} onClick={() => dispatch(actionEditInputsOrder("postalCode"))} />)
                        }}
                      />
    
                    </div>
                    <Button
                      type="submit"
                      disabled={!isValid}
                      text="submit"
                      style={{ display: 'block', margin: '0 auto', marginTop: 60, marginBottom: 150 }}
                    />
                  </Form>
                </>
              );
            }}
          </Formik>
        </>
      );
}

export default FormOrder