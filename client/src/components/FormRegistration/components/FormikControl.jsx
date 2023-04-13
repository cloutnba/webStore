import CustomInput from '../../CustomInput/CustomInput';
import PropTypes from 'prop-types';

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <CustomInput {...rest} />;
    // other cases...
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};
export default FormikControl;
