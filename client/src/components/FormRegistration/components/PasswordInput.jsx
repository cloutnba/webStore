import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormikControl from './FormikControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const PasswordInput=({name, placeholder, label, showPassword, onClick, onMouseDown})=>{

return(
    <FormikControl
    htmlFor="outlined-adornment-password"
    label={label}
    variant="outlined"
    control="input"
    color="success"
    className="form-registration__input"
    name={name}
    placeholder={placeholder}
    id="outlined-adornment-password"
    required
    type={showPassword ? 'text' : 'password'}
    InputProps={{
      endAdornment: (
        <>
          <InputAdornment  position="end" >
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
             /*  edge="end"  */
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        </>
      ),
    }}
  />
  )
}

export default PasswordInput 