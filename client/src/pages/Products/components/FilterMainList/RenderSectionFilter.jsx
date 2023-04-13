import FilterCheckBox from "../../../../components/FilterCheckBox"
import { useSelector } from 'react-redux'
import {  selectorFirstVisitAndResetToCorectFilter } from '../../../../selectors';

const RenderSectionFilter = ({arrFilters, blockNameFilters, checked, request}) => {
    const firstVisitAndResetToCorectFilter = useSelector(selectorFirstVisitAndResetToCorectFilter)

    const item = arrFilters.map((el)=>{
        return  <FilterCheckBox key={el}
                              className="brand-block__item"
                              defaultChecked={checked(blockNameFilters, el)}
                              name={blockNameFilters}
                              value={el}
                              label={el}
                              onClick={() => { request(blockNameFilters, el) }} />
    })
     return(
        <>
{  firstVisitAndResetToCorectFilter && item }
        </>
     )
}

export default RenderSectionFilter
