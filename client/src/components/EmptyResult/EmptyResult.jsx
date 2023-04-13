import { Typography, Box } from '@mui/material';
import styled from 'styled-components';

const Title = styled(Typography)`
  && {
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 50px;
  }
`;

const Container = styled(Box)`
  && {
    text-align: center;
    margin-top: 50px;
  }
`;

const EmptyResult = () => {
  return (
    <Container>
      <img
        src="https://xl-static.rozetka.com.ua/assets/img/design/cabinet/cabinet-dummy-error.svg"
        alt="dino"
      />
      <Title varian="h2">You haven't added any product yet</Title>
    </Container>
  );
};

export default EmptyResult;
