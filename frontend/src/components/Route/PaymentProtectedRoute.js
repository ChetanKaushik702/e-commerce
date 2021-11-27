import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PaymentProtectedRoute = ({ component: Component }) => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  if (loading === undefined || loading === true) return <></>;



  return isAuthenticated ? stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><Component /></Elements> : <Navigate to="/login" />;
};

export default PaymentProtectedRoute;
