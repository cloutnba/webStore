import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const EditButton = ({ onClick, dataName }) => {
  return (
    <InputAdornment dataName={dataName} position="end">
      <IconButton>
        <EditIcon onClick={() => onClick()} />
      </IconButton>
    </InputAdornment>
  )
}
export default EditButton
