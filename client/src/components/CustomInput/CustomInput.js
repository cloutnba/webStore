import { Field, useField } from 'formik';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import './CustomInput.scss';

const CustomInput = (props) => {
  const [field, meta] = useField(props);
  const { name, label, type, placeholder, className, id, helperText, autocomplete, onClick, ...rest } = props;
  return (
    <>
      <Field
        onClick={onClick}
        name={name}
        style={{ minWidth: 300 }}
        type={type}
        placeholder={placeholder}
        className={className}
        autocomplete={autocomplete}
        {...field}
        {...rest}
        as={TextField}
        label={label}
        id={id}
        helperText={
          !!meta.error && meta.touched && <span className="error-registration">{meta.error}</span>
        }

      />
    </>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default CustomInput;
