import React, { Fragment, useEffect } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';

function Products() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {products, error, productsCount, loader} = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {
                loader ? <Loader /> : (
                    <Fragment>
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {
                                products && products.map(product => <ProductCard key={product._id} product={product}/>)
                            }
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Products
