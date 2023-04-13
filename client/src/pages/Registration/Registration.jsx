import { Container } from '@mui/material';
import './Registration.scss';
import BreadCrumbs from '../../components/BreadCrumbs';
import FormRegistration from '../../components/FormRegistration';
import ValidationSchema from './components/ValidationSchema';
import ModalSuccessRegistration from './components/ModalSuccessRegistration';
import Preloader from '../../components/Preloader';
import {createCustomerServerApi, actionRegistrationSuccess, actionRegistrationError} from '../../reducers';
import ModalErrorRegistration from './components/ModalErrorRegistration'
import {useDispatch, useSelector} from "react-redux";
import {
    selectorRegistrationInitialState,
    selectorRegistrationIsLoading,
    selectorRegistrationModalError,
    selectorRegistrationModalSuccess
} from "../../selectors";



const Registration = () => {
    const dispatch = useDispatch();
    const initialFormData = useSelector(selectorRegistrationInitialState);
    const modalError = useSelector(selectorRegistrationModalError);
    const loading = useSelector(selectorRegistrationIsLoading);
    const openModal = useSelector(selectorRegistrationModalSuccess);

  return (
    <main>
      <Container className="registration-container" maxWidth="lg">
        <BreadCrumbs linksArray={[{ link: '/registration', text: 'Registration' }]} />
        <div className="registration-container__wrapper">
          <h2 className="registration-container__wrapper-title">Registration</h2>

          <FormRegistration
              initialValues={initialFormData}
              validationSchema={ValidationSchema}
              onSubmit={(values, { resetForm }) => {
                  delete values.confirmPassword;
                  dispatch(createCustomerServerApi(values)).then((axiosValue) => {
                      if (axiosValue) {
                          resetForm();
                      }
                  })
              }}

                  inputsEditName={["firstName", "lastName", "login", "email", "password", "telephone", "city", "country", "birthdate"]}
          />
            {loading && <Preloader open="true"/>}
            {openModal && <ModalSuccessRegistration closeModal={() => dispatch(actionRegistrationSuccess(false)) } />}
            {modalError && <ModalErrorRegistration closeErrorModal={() => dispatch(actionRegistrationError(false))}/>}
        </div>
      </Container>
    </main>
  );
};

export default Registration;
