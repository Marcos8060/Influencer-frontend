//------------------------ Backend APIs ----------------------//
export const API_URL = {
  /***************** AUTH APIS **********************/
  LOGIN: "http://147.78.141.95:8075/api/auth/login/",
  LOGOUT: "/api/auth/logout",
  REGISTER_BRAND: "http://147.78.141.95:8075/api/auth/register/brand/",
  SEND_OTP: "http://147.78.141.95:8075/api/auth/otp/verify/",
  REGISTER_INFLUENCER: "http://147.78.141.95:8075/api/auth/register/influencer/",



    /***************** BUCKELT LIST APIS **********************/
    ADD_BUCKETLIST: "http://147.78.141.95:8075/api/auth/register/brand/",
};


//------------------------ Application APIs ----------------------//
export const APP_API_URL = {
  /***************** AUTH APIs **********************/
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/fetch-trips",
  REGISTER_BRAND: "/api/auth/register-brand",
  SEND_OTP: "/api/auth/otp",
  REGISTER_INFLUENCER: "/api/auth/register-influencer",


  /***************** BUCKET LIST APIs **********************/
  ADD_BUCKETLIST: "/api/bucketList/create-bucket-list",

};




export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};
