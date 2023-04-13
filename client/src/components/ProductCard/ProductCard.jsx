import { ReactComponent as Favorites } from "./icons/favorite.svg"
import {ReactComponent as Scales } from "./icons/scales.svg"
import { Link } from "react-router-dom";
import cx from "classnames";
import { selectorFavorites, selectorScales } from "../../selectors";
import { toggleScalesProduct, toggleFavoriteProduct } from "../../reducers";
import { useSelector, useDispatch } from 'react-redux'
import "./ProductCard.scss";
import ByuButton from "../ByuButton";

const ProductCard = ({el, isForOrderedPage}) => {
    const {name, itemNo, _id, currentPrice, imageUrls, brand, previousPrice, quantity, cartQuantity} = el;
    const favorites = useSelector(selectorFavorites);
    const scales = useSelector(selectorScales);
    const dispatch = useDispatch();


    const checkProduct = arrayProducts => arrayProducts.some(itemId => itemId === _id);


  const toggleFavorites = id => {
    dispatch(toggleFavoriteProduct(id));
}

    const toggleScales = id => {
        dispatch(toggleScalesProduct(id));
    }

    return (
        <>
        {typeof imageUrls !== 'undefined' && 
        <div className="list" id={_id} key={_id}>
            <div className={cx("list__item", {'out-of-stock': quantity<=0})}>
                <div>
                    <div className="list__item--img">
                        <Link to={`/products/${itemNo}`}>
                            <img className="list__item--img--laptop" src={imageUrls[0]} alt={name}/> 
                        </Link>
                    </div>
                    

                    { !isForOrderedPage && (<>
                        <span>
                            <Scales
                                data-testid="scales"
                                onClick={() => toggleScales(el._id)}
                                className={cx("list__item--scales", {"list__item--scales--curent": checkProduct(scales)})} 
                                
                            />
                        </span>
                        <span>
                            <Favorites
                                onClick={() => toggleFavorites(el._id)}
                                className={cx("list__item--favorite", {"list__item--favorite--curent": checkProduct(favorites)})}/>
                        </span>
                      </>)
                    }
                </div>
                { isForOrderedPage && (
                    <div className="list__item--quantity"> Quantity: &nbsp; <span className="list__item--quantity--multiply"> &#10008;</span> {cartQuantity}</div>
                    )}

                <div>
                    <div>
              

                        <Link to={`/products/${itemNo}`}>
                            <p className="list__item--name">{name}</p>
                        </Link>
                        <p className="list__item--brand">{brand}</p>
                    </div>

                    <div className="list__item--price">
                        <span className={cx("list__item--price--curent", {"list__item--price--curent-new": previousPrice})}>
                            {currentPrice.toLocaleString()} $
                        </span>
                        {
                            previousPrice &&
                            <span className="list__item--price--previous">{previousPrice.toLocaleString()} $</span>
                        }
                    </div>

                  { !isForOrderedPage && <ByuButton product={el} />}

                </div>
            </div>
        </div>}
        </>
    )
}

ProductCard.defaultProps = {
  isForOrderedPage: false,
  el:{},
}

export default ProductCard;