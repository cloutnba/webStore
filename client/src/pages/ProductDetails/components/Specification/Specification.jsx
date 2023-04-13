
import {Box} from "@mui/material";
import './Specification.scss';

const Specification = ({property, value, isBackGround}) => {

  return(
      <Box className={`product__info-content ${isBackGround && 'product__info-content--bc'}`}>
          <span className="product__property">{property}</span>
          <span className="product__value">{value}</span>
      </Box>
  )
}

export default Specification;