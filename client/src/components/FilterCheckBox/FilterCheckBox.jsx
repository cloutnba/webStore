import { FormControlLabel, Checkbox } from '@mui/material';

const FilterCheckBox = ({ label, name, value, onClick, className, defaultChecked, checked}) => {
    return (
        <FormControlLabel className={className}
                          control={<Checkbox color="success"
                                             defaultChecked={defaultChecked}
                                             checked={checked}
                                             onClick={onClick} />}
                          label={label}
                          name={name}
                          value={value} />
    )
}

export default FilterCheckBox
