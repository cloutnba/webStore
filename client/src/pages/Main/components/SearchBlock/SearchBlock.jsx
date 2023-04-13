import {Box, Container} from '@mui/material';
import './SearchBlock.scss'
import InputSearch from "../../../../components/InputSearch";
import Button from '../../../../components/Button';

const SearchBlock = () => {

    return(
        <Box className="search">
            <Container className="search__container">
                <Box className="search__wrapper">
                    <Box className="search__title">
                        <h3 className="search__title-text">
                            Are you looking for something specific?
                        </h3>
                    </Box>
                    <Box className="search__desc">
                        <p className="search__desc-text">
                            Welcome to BestLaptops24, where we offer an extensive range of laptops to cater to all your computing needs. Our store is designed to provide a comfortable and convenient shopping experience, with knowledgeable staff available to assist you in finding the perfect laptop to suit your requirements.After placing an order, you can pick it up from the pickup point or arrange delivery to any location in the world.
                        </p>
                    </Box>
                    <Box className="search__actions">
                        <Box className="search__catalog-button-wrapper">
                            <Button to="/products" className="search__catalog-button" text="Show all products" />
                        </Box>
                        <Box className="search__input-wrapper">
                            <Box className="search__input-wrapper--helper">
                                <InputSearch style="search__input"/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default SearchBlock;
