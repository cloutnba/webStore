import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from '@mui/material';
import { selectorFilterRequest, selectorProductsQuantity } from "../../../../selectors";
import { actionFetchSearchFilterProducts } from '../../../../reducers';
import Button from '../../../../components/Button';
import cx from "classnames";


import './Paginate.scss'

const Paginate = () => {
    const filterRequestObj = useSelector(selectorFilterRequest)
    const productsQuantity = useSelector(selectorProductsQuantity)
    const dispatch = useDispatch()

    const pageCount = Math.ceil(productsQuantity / filterRequestObj.perPage);
    let newFilterRequestObj = { ...filterRequestObj }

    const handleChange = (e, page) => {
        newFilterRequestObj.startPage =  page
        dispatch(actionFetchSearchFilterProducts(newFilterRequestObj))
    }

    const showMoreProducts = () =>{
        newFilterRequestObj.perPage +=6 
        newFilterRequestObj.startPage = 1
        dispatch(actionFetchSearchFilterProducts(newFilterRequestObj)) 
    }

    return (
        <div className='pagination'>
            <Button variant={'white-shadow'}  className={cx( { "disabled-btn": pageCount == 1})} /* disabled={pageCount == 1} */ text='Show 6 more' onClick={()=>{showMoreProducts()}}></Button>
            <Pagination className='pagination-block'
                size= "medium"
                count={pageCount}
                onChange={handleChange}
                page={ newFilterRequestObj.startPage}>
            </Pagination>
        </div>

    );
}

export default Paginate
