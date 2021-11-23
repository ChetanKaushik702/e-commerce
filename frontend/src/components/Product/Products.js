import React, { Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]

function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const dispatch = useDispatch();
    const alert = useAlert();
    const {products, error, productsCount, loader, resultPerPage} = useSelector(state => state.products);

    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    return (
        <Fragment>
            {
                loader ? <Loader /> : (
                    <Fragment>
                        <MetaData title="Products ECOMMERCE"/>
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {
                                products && products.map(product => <ProductCard key={product._id} product={product}/>)
                            }
                        </div>
                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider 
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={100000}
                            />
                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {
                                    categories.map(category => (
                                        <li 
                                            className="category-link"
                                            key={category}
                                            onClick={() => setCategory(category)}
                                        >
                                            {category}
                                        </li>
                                    ))
                                }
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider 
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>
                        {
                            resultPerPage < productsCount && (
                                <div className="paginationBox">
                                    <Pagination 
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                </div>
                            )
                        }
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Products
