import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { useNavigate } from "react-router";
import './Cart.css';
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  
  const decreaseQuantity = (id, quantity) => {
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, quantity - 1));
  };

  const increaseQuantity = (id, quantity, stock) => {
    if (quantity === stock) return;
    dispatch(addItemsToCart(id, quantity + 1));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  }

  const deleteCartItems = (id) => {
      dispatch(removeItemsFromCart(id));
  }

  return (
    <Fragment>
      <MetaData title='Your cart'/>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No products in your cart</Typography>
          <Link to="/products">View products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`Rs.${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

              <div className='cartGrossTotal'>
                <div></div>
                <div className='cartGrossTotalBox'>
                  <p>Gross total</p>
                  <p>{`Rs.${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                </div>
                <div></div>
                <div className='checkOutBtn'>
                  <button onClick={checkoutHandler}>Checkout</button>
                </div>
              </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
