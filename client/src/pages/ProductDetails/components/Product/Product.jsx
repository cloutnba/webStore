 import {Box, Container} from '@mui/material';
import {ReactComponent as Scales} from "./icons/scales.svg"
import {ReactComponent as Favorites} from "../../../../components/ProductCard/icons/favorite.svg";
import './Product.scss';
import BreadCrumbs from "../../../../components/BreadCrumbs";
import cx from "classnames";
import {toggleFavoriteProduct, toggleScalesProduct} from "../../../../reducers";
import {useDispatch, useSelector} from "react-redux";
import {
    selectorFavorites,
    selectorIsDetailsProductLoading,
    selectorProduct,
    selectorScales,
} from "../../../../selectors";
import Comments from "../Comments";
import {useEffect, useState} from "react";
import Specification from "../Specification";
import SimilarProducts from "../SimilarProducts";
import Preloader from "../../../../components/Preloader";
import ByuButton from "../../../../components/ByuButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

const Product = () => {
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    useEffect(() => {
        setIsMobile(window.innerWidth <= 970);
    }, []);

    const product = useSelector(selectorProduct);
    const favorites = useSelector(selectorFavorites);
    const scales = useSelector(selectorScales);
    const isLoading = useSelector(selectorIsDetailsProductLoading);

    const dispatch = useDispatch();

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const toggleFavorites = id => {
        dispatch(toggleFavoriteProduct(id));
    }

    const toggleScales = id => {
        dispatch(toggleScalesProduct(id));
    }
    const checkProduct = arrayProducts => arrayProducts.some(itemId => itemId === product._id);
    return (
        <>

            {Object.keys(product).length > 0 && <Box className="product">
                <Container maxWidth="lg" className="product__container">
                    <Preloader open={ isLoading } />

                    <BreadCrumbs linksArray={[{link: "/products", text: "Products"}, {
                        link: `/products/${product.itemNo}`,
                        text: `${product.name}`
                    }]}/>
                    <Box className={"product__wrapper"}>
                        <Box className="product__title-wrapper">
                            <h3 className="product__title">{product.name}</h3>
                        </Box>
                        <Box className="product__image-wrapper">
                            <Swiper loop = {true}
                                    spaceBetween = {1}
                                    navigation={true}
                                    thumbs={{swiper: thumbsSwiper}}
                                    modules={[FreeMode, Navigation,Thumbs]}
                                    className = "product__image">
                                {product.imageUrls.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className='image-block'>
                                        <img src={item} alt={`laptop${index}`} />
                                    </div>
                                </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper onSwiper={setThumbsSwiper}
                                    spaceBetween={5}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="product__thumbs">
                                {product.imageUrls.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img width={80} height={80} src={item} alt={`laptop${index}`} />
                                </SwiperSlide>
                                ))}
                          </Swiper>

                            <Box className="product__action-wrapper">
                                 <span>
                                     <Scales onClick={() => toggleScales(product._id)}
                                             className={cx("list__item--scales product__action", {"list__item--scales--curent": checkProduct(scales)})}/>
                                 </span>
                                <span>
                                    <Favorites onClick={() => toggleFavorites(product._id)}
                                               className={cx("list__item--favorite product__action", {"list__item--favorite--curent": checkProduct(favorites)})}/>
                                </span>
                            </Box>
                        </Box>
                        <Box className="product__desc-wrapper">
                            <Box className="product__desc-title-wrapper">
                                <h5 className="product__desc-title">Product description</h5>
                            </Box>

                            <Box className="product__desc-text-wrapper">
                                <p className="product__desc-text">
                                    { !isMobile || showAll ? product.description : `${product.description.slice(0, 225)}...`}
                                </p>
                                {isMobile &&  (
                                    <button onClick={toggleShowAll} className="product__desc-button">
                                        {showAll ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </Box>

                        </Box>


                        <Box className="product__info-wrapper">
                            <Box className="product__info-title-wrapper">
                                <h5 className="product__info-title">Information</h5>
                            </Box>

                            <Box className="product__info-content-wrapper">
                                <Specification property="Brand" value={product.brand} isBackGround={true}/>
                                <Specification property="Processor" value={product.processorType}/>
                                <Specification property="Screen size" value={`${product.screenSize}"`} isBackGround={true}/>
                                <Specification property="GPU" value={product.videoCard}/>
                                <Specification property="OS" value={product.operatingSystem || "Without OS"} isBackGround={true}/>
                                <Specification property="RAM" value={product.ramMemory}/>
                                <Specification property="HDR" value={product.hardDriveCapacity} isBackGround={true}/>
                                <Specification property="Color" value={product.color}/>
                            </Box>
                            <Box className="product__button-wrapper">
                            <Box className="product__price-wrapper">
                                <span className="product__price-text">PRICE</span>
                                <Box className="product__item--price">
                                    <p className={product.previousPrice ? "product__item--price--curent" : "product__item--price--default" }>{product.currentPrice.toLocaleString()} $</p>
                                    {product.previousPrice &&
                                        <p className="product__item--price--previous">{product.previousPrice.toLocaleString()} $</p>}
                                </Box>
                            </Box>

                            <ByuButton className="product__buy-button" product={product}/>
                        </Box>
                        </Box>


                    </Box>

                    <Comments/>
                    <SimilarProducts />
                </Container>
            </Box>}
        </>
    )
}

export default Product;

