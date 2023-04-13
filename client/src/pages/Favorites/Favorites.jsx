import * as React from 'react';
import './Favorites.scss';
import { useDispatch, useSelector } from 'react-redux';
import {selectorFavorites, selectorFavoritesProduct, selectorIsFavoritesPageLoading} from '../../selectors';
import { useEffect } from 'react';
import { actionCheckFavorites, getProductsFavorites } from '../../reducers';
import ProductCard from '../../components/ProductCard';
import Grid from '@mui/material/Grid';
import EmptyResult from '../../components/EmptyResult/EmptyResult';
import { Container } from '@mui/material';
import Preloader from "../../components/Preloader";
import BreadCrumbs from "../../components/BreadCrumbs";

export default function Favorites() {
  const favorites = useSelector(selectorFavorites);
  const productFavorites = useSelector(selectorFavoritesProduct);

  const isLoading = useSelector(selectorIsFavoritesPageLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCheckFavorites());
    dispatch(getProductsFavorites())
  }, []);

  useEffect(() => {
    dispatch(getProductsFavorites())
  }, [favorites]);

  return (
    <div className="sector_favorites">
      <Preloader open={isLoading} />
      <Container maxWidth="lg">
        <BreadCrumbs linksArray={[{link: "/favorites", text: "Favorite Products"}]}/>
        <h1 className="favorites__title">
          Favorite <span className="title_contrast">Products</span>
        </h1>
        {favorites.length <= 0 ? (
          <EmptyResult />
        ) : (
          <div>
            <Grid container spacing={10}>
              {productFavorites.map((el, index) => (
                <Grid className="grid-main-list" item xs="12" sm="6" md="4" key={el._id}>
                  <ProductCard el={el} index={index} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
}
