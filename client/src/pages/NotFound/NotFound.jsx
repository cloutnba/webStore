import {Box, Container} from '@mui/material';
import './NotFound.scss';
import Button from "../../components/Button";

const NotFound = () => {
  return(
      <Box className="not-found">
          <Container maxWidth="xl" className="not-found__container">
              <Box className="not-found__wrapper">
                  <h4 className="not-found__error">Error 404</h4>
                  <h2 className="not-found__text">Page not found</h2>
                  <p className="not-found__desc">The address is entered incorrectly or such a page no longer exists on the site.</p>
                  <Button to="/" text="Back to main page" className="not-found__back-btn"/>
              </Box>
          </Container>
      </Box>
  )
}

export default NotFound;
