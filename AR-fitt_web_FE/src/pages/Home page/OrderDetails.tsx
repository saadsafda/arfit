import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import AddToCartButton from "../../components/atomicComponents/AddToCartButton";
import HomeNavbar from "../../components/HomePage/homeNavbar";

const OrderDetails = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { order, user } = location.state || {};

  if (!order || !user) {
    return (
      <>
        <div className="px-6 md:px-8"><HomeNavbar /></div>
        <Box className="flex flex-col items-center justify-center min-h-[60vh]">
          <Typography variant="h5" className="mb-4 font-Montserrat font-bold text-gray-400">No order details found.</Typography>
          <AddToCartButton className="mt-4" onClick={() => navigate("/")}>Return Home</AddToCartButton>
        </Box>
      </>
    );
  }

  return (
    <>
      <div className="px-6 md:px-8"><HomeNavbar /></div>
      <Grid container className="flex flex-col gap-6 items-center px-6 py-10 font-Montserrat bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <Typography className="text-3xl font-bold text-gray-700 mb-4">Order Confirmation</Typography>
        <Box className="w-full bg-gray-100 rounded-lg p-4 shadow-sm mb-4">
          <Typography className="text-xl font-bold text-gray-700 mb-2">Order ID: {orderId}</Typography>
          <Typography className="text-xl font-bold text-gray-700 mb-2">Order Summary</Typography>
          <Grid container className="flex flex-col gap-2">
            {order.items.map((item: any) => (
              <Grid item xs={12} key={item.id} className="flex justify-between">
                <span className="text-gray-700">{item.name} x {item.quantity}</span>
                <span className="text-gray-700">£{(item.price * item.quantity).toFixed(2)}</span>
              </Grid>
            ))}
            <Grid item xs={12} className="flex justify-between font-bold mt-2">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-700">£{order.total.toFixed(2)}</span>
            </Grid>
          </Grid>
        </Box>
        <Box className="w-full bg-gray-100 rounded-lg p-4 shadow-sm mb-4">
          <Typography className="text-xl font-bold text-gray-700 mb-2">Your Details</Typography>
          <Typography className="text-gray-700">Name: {user.name}</Typography>
          <Typography className="text-gray-700">Email: {user.email}</Typography>
          <Typography className="text-gray-700">Address: {user.address}</Typography>
          <Typography className="text-gray-700 mb-2">Phone: {user.phone}</Typography>
        </Box>
        <Typography className="text-2xl font-bold text-primaryDark mb-6">Thank you for your order!</Typography>
        <Box className="flex gap-4 w-full justify-center">
          <AddToCartButton className="w-full md:w-auto" onClick={() => navigate("/")}>Return Home</AddToCartButton>
          <AddToCartButton className="w-full md:w-auto" onClick={() => navigate("/home")}>Shop Again</AddToCartButton>
        </Box>
      </Grid>
    </>
  );
};

export default OrderDetails; 