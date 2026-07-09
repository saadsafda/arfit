import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { clearCart } from "../../redux/cart/cartActions";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, TextField } from "@mui/material";
import AddToCartButton from "../../components/atomicComponents/AddToCartButton";
import HomeNavbar from "../../components/HomePage/homeNavbar";

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errs: any = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.address) errs.address = "Address is required";
    if (!form.phone || !/^\+?\d{7,15}$/.test(form.phone)) errs.phone = "Valid phone is required";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length === 0) {
      // Generate order ID
      const orderId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      // Prepare order summary
      const order = {
        items: cartItems,
        total: subtotal,
      };
      // Clear cart
      dispatch(clearCart());
      // Redirect to order details
      navigate(`/order-details/${orderId}`, {
        state: { order, user: form },
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', overflowY: 'scroll', background: 'white' }}>
      <div className="px-6 md:px-8"><HomeNavbar /></div>
      <Grid container className="flex flex-col gap-6 items-center px-6 py-10 font-Montserrat bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <Typography className="text-3xl font-bold text-gray-700 mb-4">Checkout</Typography>
        <Box className="w-full bg-gray-100 rounded-lg p-4 shadow-sm mb-4">
          <Typography className="text-xl font-bold text-gray-700 mb-2">Order Summary</Typography>
          <Grid container className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id} className="flex justify-between">
                <span className="text-gray-700">{item.name} x {item.quantity}</span>
                <span className="text-gray-700">£{(item.price * item.quantity).toFixed(2)}</span>
              </Grid>
            ))}
            <Grid item xs={12} className="flex justify-between font-bold mt-2">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-700">£{subtotal.toFixed(2)}</span>
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={handleSubmit} noValidate className="w-full bg-gray-100 rounded-lg p-4 shadow-sm">
          <Typography className="text-xl font-bold text-gray-700 mb-4">Your Details</Typography>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name && submitted}
            helperText={submitted && errors.name}
            fullWidth
            className="mb-4 bg-white rounded"
            InputProps={{ className: "font-Montserrat" }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email && submitted}
            helperText={submitted && errors.email}
            fullWidth
            className="mb-4 bg-white rounded"
            InputProps={{ className: "font-Montserrat" }}
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={!!errors.address && submitted}
            helperText={submitted && errors.address}
            fullWidth
            className="mb-4 bg-white rounded"
            InputProps={{ className: "font-Montserrat" }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone && submitted}
            helperText={submitted && errors.phone}
            fullWidth
            className="mb-6 bg-white rounded"
            InputProps={{ className: "font-Montserrat" }}
          />
          <AddToCartButton className="w-full mt-2" type="submit">
            Place Order
          </AddToCartButton>
        </form>
      </Grid>
    </div>
  );
};

export default Checkout; 