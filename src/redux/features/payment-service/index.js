import { fetchPaymentPlans } from "@/redux/services/payment-service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentPlans: [],
};

const PaymentSlice = createSlice({
  name: "payment-service",
  initialState,
  reducers: {
    setPaymentPlans: (state, action) => {
      state.paymentPlans = action.payload;
    },
    
  },
});

export const {
  setPaymentPlans,
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
