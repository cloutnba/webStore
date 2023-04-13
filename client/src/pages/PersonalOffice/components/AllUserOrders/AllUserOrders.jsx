import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { actionFetchAllUserOrders } from "../../../../reducers";
import { selectorAllUserOrders } from "../../../../selectors";

import ProductsSlider from "../../../../components/ProductsSlider";
import { actionFetchCancelOrder, actionFetchGetOneOrder, actionFetchUpdatedOrder } from "../../../../reducers";
import FormOrder from "../../../../components/FormOrder";
import { selectorEditInputsOrder, selectorOrderInfo, selectorPageLoadingPersonalOffice, selectorServerErrorPersonalOffice } from "../../../../selectors";
import EmptyResult from "../../../../components/EmptyResult/EmptyResult";
import Button from "../../../../components/Button";
import Preloader from "../../../../components/Preloader";
import ServerError from "../../../../components/Notifications/ServerError";


import './AllUserOrder.scss'
import { values } from "lodash";

const AllUserOrders = () => {


    const [openOrderInfo, setOpenOrderInfo] = useState([])

    const allUserOrders = useSelector(selectorAllUserOrders)
    const orderInfo = useSelector(selectorOrderInfo)







    const pageLoading = useSelector(selectorPageLoadingPersonalOffice)
    const serverError = useSelector(selectorServerErrorPersonalOffice)
    const dispatch = useDispatch()

    const editInputsOrder = useSelector(selectorEditInputsOrder)

    useEffect(() => {
        dispatch(actionFetchAllUserOrders())
    }, [])

    useEffect(() => {
    }, [allUserOrders])



    const blockOrder = allUserOrders.map(({ products, totalSum, orderNo, date, _id }) => {
        const itemOrder = products.map(({ product }) => {
            return product
        })
        return (
            <div className="order">
                <ProductsSlider key={products._id} products={itemOrder} isForOrderedPage={true} />
                <div className="order-block">
                    <div>
                        <p className="order-info">Order date: &nbsp;  <span className="order-info-description">{date.slice(0, 10)}</span></p>
                        <p className="order-info">Total sum: &nbsp;  <span className="order-info-description">{totalSum} $</span></p>
                        <p className="order-info">Order number:  &nbsp; <span className="order-info-description">{orderNo}</span></p>
                    </div>
                    <div className="order-block__btn">
                    <Button className="order-block__btn--cancel" type={"button"} text="Cancel the order" onClick={() => {
                        dispatch(actionFetchCancelOrder(_id))

                    }}/>
                  <Button type={"button"} text={openOrderInfo.includes(orderNo)? "Сlose info" : "More info"} onClick={() => {

                        if (openOrderInfo.includes(orderNo)) {
                            setOpenOrderInfo(openOrderInfo.filter((el) => el !== orderNo))

                        } else {
                            dispatch(actionFetchGetOneOrder(orderNo))
                            setOpenOrderInfo([/* ...openOrderInfo, */ orderNo])
                        }
                    }}/>
                    </div>
                </div>


                {openOrderInfo.includes(orderNo) && !pageLoading &&

                    <div className="order-info__extra">
                        {orderInfo.firstName !== '' && <p className="order-info__extra--header"> First name: &nbsp;<span className="order-info__extra--value">{orderInfo.firstName}</span></p>}
                        {orderInfo.lastName !== '' && <p className="order-info__extra--header"> Last name: &nbsp;<span className="order-info__extra--value">{orderInfo.lastName}</span></p>}
                        {orderInfo.telephone !== '' && <p className="order-info__extra--header"> Telephone: &nbsp;<span className="order-info__extra--value">{orderInfo.telephone}</span></p>}
                        {orderInfo.email !== '' && <p className="order-info__extra--header"> Email: &nbsp;<span className="order-info__extra--value">{orderInfo.email}</span></p>}
                        {orderInfo.country !== '' && <p className="order-info__extra--header"> Country: &nbsp;<span className="order-info__extra--value">{orderInfo.country}</span> </p>}
                        {orderInfo.city !== '' && <p className="order-info__extra--header"> City: &nbsp;<span className="order-info__extra--value">{orderInfo.city}</span> </p>}
                        {orderInfo.address !== '' && <p className="order-info__extra--header"> Address: &nbsp;<span className="order-info__extra--value">{orderInfo.address}</span> </p>}
                        {orderInfo.postalCode !== '' && <p className="order-info__extra--header"> PostalCode: &nbsp;<span className="order-info__extra--value">{orderInfo.postalCode}</span> </p>}
                    </div>}
                {/*                   {openOrderInfo.includes(orderNo) && !pageLoading &&  <FormOrder 
                                                                inputsEditName={editInputsOrder}  
                                                                initialValues={orderInfo}  
                                                                btnEdit={true}
                                                                onSubmit={(values)=>{
                                                                    dispatch(actionFetchUpdatedOrder(_id))
                                                                }}/> }
               
                 */}
            </div>


        )

    })



    return (
        <>
         <Preloader open={pageLoading} />
         {serverError && <ServerError />}
         {!serverError && (
            <>
            {allUserOrders.length > 0 ? blockOrder : <EmptyResult />}
            </>
         )}
        </>

    )
}

export default AllUserOrders