import { TextField, FormLabel, FormGroup, Slider, FormControl, Select, MenuItem } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import cx from "classnames";
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux'
import { selectorFilterRequest, selectorPageLoading, selectorFirstVisitAndResetToCorectFilter, selectorUrlAddress } from '../../../../selectors';
import { actionFetchSearchFilterProducts } from '../../../../reducers';
import RenderSectionFilter from './RenderSectionFilter';
import { brand, category, processorBrand, screenSize, color, ramMemory, hardDriveCapacity } from './configFilters';

import './FilterMainList.scss'
import Button from "../../../../components/Button";


const FilterMainList = () => {

    const firstVisitAndResetToCorectFilter = useSelector(selectorFirstVisitAndResetToCorectFilter)
    const filterRequestObj = useSelector(selectorFilterRequest)
    const [showMoreFilters, setShowMoreFilters] = useState(JSON.parse(sessionStorage.getItem("showMoreFilters")) || false)
    const [minimalInputPrice, setMinimalInputPrice] = useState(filterRequestObj.minPrice || '') 
    const [maximalInputPrice, setMaximalInputPrice] = useState(filterRequestObj.maxPrice || '')
    const [price, setPrice] = useState([800, 2700]);
    const dispatch = useDispatch()
    let newFilterRequestObj = { ...filterRequestObj }

    useEffect(() => {
        setMinimalInputPrice(filterRequestObj.minPrice)
        setMaximalInputPrice(filterRequestObj.maxPrice)
    }, [filterRequestObj])

    const handleChange = (e, data) => {
        if (data[0] > data[1] - 500) {
            return null
        }
        setPrice(data) 
        setMinimalInputPrice(data[0])
        setMaximalInputPrice(data[1] - 500)
    };

    const request = (key, name) => {
        newFilterRequestObj.perPage = 6
        newFilterRequestObj.startPage = 1
        newFilterRequestObj[key].includes(name) ?
            newFilterRequestObj[key] = newFilterRequestObj[key].split(',').filter(item => item !== name).join(',')
            :
            newFilterRequestObj[key] += name + ","
        dispatch(actionFetchSearchFilterProducts(newFilterRequestObj))
    }

    const filterWithCurentPrice = (e) => {

        newFilterRequestObj.minPrice = minimalInputPrice
        newFilterRequestObj.maxPrice = maximalInputPrice
        newFilterRequestObj.startPage = 1
        newFilterRequestObj.perPage = 6

        if (e) {
            newFilterRequestObj.sort = e
        }
        dispatch(actionFetchSearchFilterProducts(newFilterRequestObj))
    }

    const comparePrice = () => {
        if (minimalInputPrice > maximalInputPrice) {
            return false
        }
        if (minimalInputPrice <= 0 || maximalInputPrice <= 0) {
            return false
        }
        if (!!isNaN(+minimalInputPrice) || !!isNaN(+maximalInputPrice)) {
            return false
        }
        return true
    }
    const checked = (key, name) => {

        return filterRequestObj[key].includes(name)


    }

    return (
        <>
            <section className='main-filter-block'>
                <FormControl>
                    <div className='header-filter'> Sort by  </div>
                    <Select value={filterRequestObj.sort} color="success" sx={{
                        /*  width: 140 */
                    }}
                        onChange={(e) => { filterWithCurentPrice(e.target.value) }}
                    >
                        <MenuItem name={'sort'} value={' '}>Popular</MenuItem>
                        <MenuItem name={'sort'} value={"currentPrice"}>Cheap first</MenuItem>
                        <MenuItem name={'sort'} value={"-currentPrice"}>Expensive first</MenuItem>
                    </Select>
                </FormControl>

                <FormGroup>
                    <FormLabel class='header-filter'>Brand</FormLabel>
                    <RenderSectionFilter arrFilters={brand} blockNameFilters={'brand'} checked={checked} request={request} />
                </FormGroup>

                <FormGroup>
                    <FormLabel class='header-filter'>Category</FormLabel>
                    <RenderSectionFilter arrFilters={category} blockNameFilters={'category'} checked={checked} request={request} />
                </FormGroup>

                <div>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TextField
                            color="success"
                            height="20px"
                            maxRows="6"
                            size="small"
                            value={minimalInputPrice}
                            onChange={(e) => setMinimalInputPrice(e.target.value)}
                        />
                        <span className='line'> </span>
                        <TextField
                            color="success"
                            maxRows="6"
                            size="small"
                            value={maximalInputPrice}
                            onChange={(e) => setMaximalInputPrice(e.target.value)}
                        />

                    </Box>
                    {firstVisitAndResetToCorectFilter && <Box className="price-box">
                        <Slider className="price-box__line" color="success"
                            value={price}
                            onChange={handleChange}
                            max={3700}
                            min={100}
                            disableSwap
                        />
                        <button disabled={!comparePrice()}
                            className={cx("btn-send-request", { "btn-send-request-disabled": !comparePrice() })}
                            onClick={() => filterWithCurentPrice()}>OK
                        </button>
                    </Box>}
                </div>
                <FormGroup>
                    <FormLabel class='header-filter header-filter__name'>Procesor</FormLabel>
                    <RenderSectionFilter arrFilters={processorBrand} blockNameFilters={'processorBrand'} checked={checked} request={request} />
                </FormGroup>

                {showMoreFilters ?
                    <>
                        <FormGroup>
                            <FormLabel class='header-filter header-filter__name'>Screen size</FormLabel>
                            <RenderSectionFilter arrFilters={screenSize} blockNameFilters={'screenSize'} checked={checked} request={request} />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel class='header-filter header-filter__name'>Color</FormLabel>
                            <RenderSectionFilter arrFilters={color} blockNameFilters={'color'} checked={checked} request={request} />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel class='header-filter header-filter__name'>Ram memory</FormLabel>
                            <RenderSectionFilter arrFilters={ramMemory} blockNameFilters={'ramMemory'} checked={checked} request={request} />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel class='header-filter header-filter__name'>Hard drive</FormLabel>
                            <RenderSectionFilter arrFilters={hardDriveCapacity} blockNameFilters={'hardDriveCapacity'} checked={checked} request={request} />
                        </FormGroup>
                        <div className='show-more-filters'>
                        <Button
                            text="Hide filters"
                            variant='white-shadow'
                            onClick={() => {
                                setShowMoreFilters(false)
                                sessionStorage.setItem("showMoreFilters", false)
                            }} />
                        </div>
                    </>
                    :
                    <div className='show-more-filters'>
                        <Button
                            text="Show more filters"
                            variant='white-shadow'
                            onClick={() => {
                                setShowMoreFilters(true);
                                sessionStorage.setItem("showMoreFilters", true)
                            }} />
                    </div>
                }
            </section>
        </>
    )
}

export default FilterMainList;
