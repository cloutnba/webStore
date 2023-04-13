import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Для использования, компонента в отедльном блоке, а не на весь экран, этот блок должен быть position: relative
const Preloader = (props) => (
    <div>
      <Backdrop
        sx={{color: '#4f9c2c', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
        style={{ backgroundColor: 'white', opacity: 0.7, position: 'absolute' }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
);

export default Preloader;
