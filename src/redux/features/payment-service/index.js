import { fetchCustomerSubscriptions, fetchPaymentPlans } from "@/redux/services/payment-service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentPlans: [],
  checkoutResponse: {},
  customerSubscriptions: {}
};

const PaymentSlice = createSlice({
  name: "payment-service",
  initialState,
  reducers: {
    setPaymentPlans: (state, action) => {
      state.paymentPlans = action.payload;
    },
    setCheckoutResponse: (state, action) => {
      state.checkoutResponse = action.payload;
    },
    setCustomerSubscriptions: (state, action) => {
      state.customerSubscriptions = action.payload;
    },
    
  },
});

export const {
  setPaymentPlans,
  setCheckoutResponse,
  setCustomerSubscriptions
} = PaymentSlice.actions;

export const fetchAllPaymentPlans = () => async (dispatch) => {
  try {
    const data = await fetchPaymentPlans();
    dispatch(setPaymentPlans(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCustomerSubscriptions = (customerId) => async (dispatch) => {
  try {
    const data = await fetchCustomerSubscriptions(customerId);
    dispatch(setCustomerSubscriptions(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};





export default PaymentSlice.reducer;
