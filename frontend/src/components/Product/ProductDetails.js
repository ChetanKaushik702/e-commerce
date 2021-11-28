import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { addItemsToCart } from '../../actions/cartAction';
import ReactStars from "react-rating-stars-component";
import ReviewsCard from "./ReviewsCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  const { id } = useParams();

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success('Item added to cart');
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product ? `${product.name}` : "Product Details"} />
          <div className="productDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, idx) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${idx} slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs.${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button
                      onClick={() => {
                        setQuantity((prevValue) => prevValue >= 2 ? prevValue - 1 : prevValue);
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      readOnly
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setQuantity((prevValue) => prevValue < product.stock ? prevValue + 1 : prevValue);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of stock" : "In stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review, idx) => (
                <ReviewsCard key={idx} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
