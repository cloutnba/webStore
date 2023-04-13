import {IconButton, InputBase} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {useDispatch, useSelector} from "react-redux";
import {selectorSearchInputValue} from "../../selectors";
import {actionSearchInputValue, actionFetchSearchProducts, actionFilterRequest} from "../../reducers";
import {useRef} from "react";

const InputSearch = ({style = "header__input"}) => {
    const searchInputValue = useSelector(selectorSearchInputValue)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchInput = useRef(null);

    const handleSearch = () => {
        if (searchInputValue !== '') {
            dispatch(actionFetchSearchProducts(searchInputValue));
            searchInput.current.blur();
            navigate(`/products`);
        }
    }

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    return (
        <InputBase
            inputRef={searchInput}
            className={style}
            placeholder="Search"
            value={searchInputValue}
            onChange={(e) => {
                dispatch(actionSearchInputValue(e.target.value));
            }}
            onKeyPress={handleEnterPress}
            endAdornment={
                <Link to="/products">
                    <IconButton onClick={() => handleSearch()}>
                        <SearchIcon/>
                    </IconButton>
                </Link>
            }
        />
    )
}

export default InputSearch;
