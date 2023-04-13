import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@mui/material";
import ProductCard from "../ProductCard";
import "./ProductsSlider.scss"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import cx from "classnames";

const ProductsSlider = ({ products, isForOrderedPage, productsLimit }) => {

  const NextArrow = ({ className, onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        <NavigateNextIcon style={{color: 'black'}}/>
      </div>
    );
  }

  const PrevArrow = ({ className, onClick}) => {
    return (
      <div className={className} onClick={onClick}>
        <NavigateBeforeIcon style={{color: 'black'}}/>
      </div>
    );
  }

  const productsSlice = products.slice(0, productsLimit);

  const settings = {
    className: "discounted-products__slider",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 715,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
  };
  return(
    <Container className="products-slider" maxWidth="lg">
      <Slider {...settings}>
        {productsSlice?.map((el, index) => {
          return (
            <div key={index} className="products-slider__slider-item">
              <ProductCard el={el} isForOrderedPage={isForOrderedPage}/>
            </div>
          )
        })}
      </Slider>
    </Container>
  )
}

export default ProductsSlider;
