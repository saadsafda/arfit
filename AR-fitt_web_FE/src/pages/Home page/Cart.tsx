import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { updateQuantity, removeFromCart } from "../../redux/cart/cartActions";
import { Box, Typography, IconButton, Grid, TextField } from "@mui/material";
import AddToCartButton from "../../components/atomicComponents/AddToCartButton";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../../components/HomePage/homeNavbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity(id, quantity));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

  if (!cartItems.length) {
    return (
      <div style={{ minHeight: '100vh', overflowY: 'scroll', background: 'white' }}>
        <div className="px-6 md:px-8"><HomeNavbar /></div>
        <Box className="flex flex-col items-center justify-center min-h-[60vh]">
          <Typography variant="h5" className="mb-4 font-Montserrat font-bold text-gray-400">Your cart is empty.</Typography>
        </Box>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', overflowY: 'scroll', background: 'white' }}>
      <div className="px-6 md:px-8"><HomeNavbar /></div>
      <Grid container className="flex flex-col gap-6 items-center px-6 py-10 font-Montserrat bg-white rounded-lg shadow-md max-w-3xl mx-auto">
        <Typography className="text-3xl font-bold text-gray-700 mb-4">Shopping Cart</Typography>
        <Grid container className="flex flex-col gap-4 w-full">
          {cartItems.map((item) => (
            <Box key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm mb-2">
              <Box className="flex flex-col gap-1 flex-1 w-full">
                <Typography className="text-lg font-bold text-gray-700">{item.name}</Typography>
                <Typography className="text-sm text-gray-500">Price: £{item.price}</Typography>
                <Box className="flex items-center gap-2 mt-2">
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                    inputProps={{ min: 1, style: { width: 60 } }}
                    className="mr-2 bg-white rounded"
                  />
                  <Typography className="text-sm text-gray-600">Total: £{(item.price * item.quantity).toFixed(2)}</Typography>
                  <IconButton onClick={() => handleRemove(item.id)} color="error" className="ml-2">
                    <span role="img" aria-label="remove">🗑️</span>
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
        <Box className="flex flex-col md:flex-row justify-between items-center w-full mt-6 gap-4">
          <Typography className="text-xl font-bold text-gray-700">Subtotal: £{subtotal.toFixed(2)}</Typography>
          <AddToCartButton className="w-full md:w-auto" onClick={() => navigate('/checkout')}>
            Checkout
          </AddToCartButton>
        </Box>
      </Grid>
    </div>
  );
};

export default Cart; 