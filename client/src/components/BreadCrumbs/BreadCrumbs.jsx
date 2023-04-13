import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./BreadCrumbs.scss"

const BreadCrumbs = ({ linksArray = [] }) => {
    return (
        <div className="breadcrumbs__wrapper">
            <Link to="/" className="breadcrumbs__link">Home</Link>
            {
                linksArray.map((item, index) => (
                    <Link key={ index } to={ item.link } className="breadcrumbs__link">{ item.text }</Link>)
                )
            }
        </div>
    );
};

BreadCrumbs.propTypes = {
    linksArray: PropTypes.array.isRequired,
};

export default BreadCrumbs;
