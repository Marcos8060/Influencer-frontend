import { fetchPaymentPlans } from "@/redux/services/payment-service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentPlans: [],
  checkoutResponse: {}
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
    
  },
});

export const {
  setPaymentPlans,
  setCheckoutResponse
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





export default PaymentSlice.reducer;
