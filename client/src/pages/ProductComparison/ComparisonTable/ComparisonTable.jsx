import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectorScales,
  selectorProductComparison,
  selectorIsScalesPageLoading,
} from '../../../selectors';
import { actionDeleteFromScales, actionFetchProductScalesByItemNo } from '../../../reducers';
import './ComparisonTable.scss';
import Preloader from '../../../components/Preloader';
import EmptyResult from '../../../components/EmptyResult/EmptyResult';
import { height } from '@mui/system';

const ComparisonTable = () => {
  const dispatch = useDispatch();
  const allProd = useSelector(selectorProductComparison);
  const itemNoArr = useSelector(selectorScales);
  const isLoading = useSelector(selectorIsScalesPageLoading);

  useEffect(() => {
    dispatch(actionFetchProductScalesByItemNo(itemNoArr));
  }, [itemNoArr]);

  const deleteFromTable = (id) => {
    dispatch(actionDeleteFromScales(id));
  };

  return (
    <div className="comparison-container__wrapper">
      <Preloader open={isLoading} />
      {allProd.length <= 0 ? (
        <EmptyResult />
      ) : (
        <table className="comparison-table">
          <thead class="comparison-table__thead">
            <tr>
              <th className="table_th" />
              {allProd.map((product) => (
                <th
                  className="table_th"
                  key={product.imageUrls}
                >
                  <svg
                    onClick={() => deleteFromTable(product._id)}
                    className="comparison-table__delete"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_73_193)">
                      <path
                        d="M1.20093 10.8L6.00093 5.99998L10.8009 1.19998"
                        stroke="#C9C9C9"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                      />
                      <path
                        d="M1.20093 1.19998L6.00093 5.99998L10.8009 10.8"
                        stroke="#C9C9C9"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_73_193">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <img className='img-scalle'
                   /*  style={{ maxWidth: '100%', height: '150px',  media (max-width: 880px) {  }} */
                    src={product.imageUrls[0]}
                    alt="laptop"
                  />
                </th>
              ))}
            </tr>

            <tr className="comparison-table__product-name">
              <th className="table_th" />
              {allProd.map((product) => (
                <th className="table_th" key={product.id}>
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="comparison-table__product-brand">
              <th className="table_th" scope="row">
                Brand
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.brand}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-category">
              <th className="table_th" scope="row">
                Category
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.category}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-currentPrice">
              <th className="table_th" scope="row">
                Current Price
              </th>
              {allProd.map((product) => (
                <td key={product.id} className="text-center">
                  {product.currentPrice} $
                </td>
              ))}
            </tr>
            <tr className="comparison-table__product-processorType">
              <th className="table_th" scope="row">
                Processor type
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.processorType}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-screenSize">
              <th className="table_th" scope="row">
                Screen size
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.screenSize}"</td>
              ))}
            </tr>
            <tr className="comparison-table__product-videoCard">
              <th className="table_th" scope="row">
                Video card
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.videoCard}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-operatingSystem">
              <th className="table_th" scope="row">
                OS
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.operatingSystem}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-ramMemory">
              <th className="table_th" scope="row">
                RAM
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.ramMemory}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-hardDriveCapacity">
              <th className="table_th" scope="row">
                SSD
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.hardDriveCapacity}</td>
              ))}
            </tr>
            <tr className="comparison-table__product-color">
              <th className="table_th" scope="row">
                Color
              </th>
              {allProd.map((product) => (
                <td key={product.id}>{product.color}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComparisonTable;
