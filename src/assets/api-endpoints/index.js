//------------------------ Backend APIs ----------------------//
export const API_URL = {
  /***************** AUTH APIS **********************/
  LOGIN: "http://147.78.141.95:8075/api/auth/login/",
  LOGOUT: "/api/auth/logout",
  REGISTER_BRAND: "http://147.78.141.95:8075/api/auth/register/brand/",
  SEND_OTP: "http://147.78.141.95:8075/api/auth/otp/verify/",
  REGISTER_INFLUENCER: "http://147.78.141.95:8075/api/auth/register/influencer/",
  ONBOARD_BRAND: "http://147.78.141.95:8075/api/brands/onboarding/post/",


    /***************** INFLUENCER APIS **********************/
  ONBOARD_INFLUENCER: "http://147.78.141.95:8075/api/influencers/onboarding/post/",
  FILTER_INFLUENCER: "http://147.78.141.95:8075/api/search/influencers/",
  MOVE_TO_BUCKET: "http://147.78.141.95:8075/api/brands/bucketList/influencers/move/",
  FETCH_INFLUENCER_DETAILS: "http://147.78.141.95:8075/api/auth/users/get/",
  FETCH_INFLUENCER_PREFERENCES: "http://147.78.141.95:8075/api/influencers/preferences/get/",
  FETCH_INFLUENCER_ONBOARDING: "http://147.78.141.95:8075/api/influencers/get/",
  EDIT_INFLUENCER_DETAILS: "http://147.78.141.95:8075/api/auth/users/update/",

    /***************** BUCKELT LIST APIS **********************/
    ADD_BUCKETLIST: "http://147.78.141.95:8075/api/brands/bucketList/create/",
    FETCH_BUCKETLIST: "http://147.78.141.95:8075/api/brands/bucketList/",
    DELETE_BUCKETLIST: "http://147.78.141.95:8075/api/brands/bucketList/delete/",
    EDIT_BUCKETLIST: "http://147.78.141.95:8075/api/brands/bucketList/update/",
};


//------------------------ Application APIs ----------------------//
export const APP_API_URL = {
  /***************** AUTH APIs **********************/
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/fetch-trips",
  REGISTER_BRAND: "/api/auth/register-brand",
  SEND_OTP: "/api/auth/otp",
  REGISTER_INFLUENCER: "/api/auth/register-influencer",
  ONBOARD_BRAND: "/api/onboarding/brand",


    /***************** INFLUENCER APIS **********************/
  ONBOARD_INFLUENCER: '/api/onboarding/influencer',
  FILTER_INFLUENCER: '/api/influencer/filter-influencer',
  FETCH_INFLUENCERS: '/api/influencer/fetch-influencers',
  MOVE_TO_BUCKET: '/api/influencer/move-to-bucket',
  FETCH_INFLUENCER_DETAILS: "/api/influencer/profile/influencer-details",
  FETCH_INFLUENCER_PREFERENCES: "/api/influencer/profile/preferences",
  FETCH_INFLUENCER_ONBOARDING: "/api/influencer/profile/onboarding-details",
  EDIT_INFLUENCER_DETAILS: "/api/influencer/profile/edit-influencer-details",


  /***************** BUCKET LIST APIs **********************/
  ADD_BUCKETLIST: "/api/bucketList/create-bucket-list",
  FETCH_BUCKETLIST: "/api/bucketList/fetch-bucket-list",
  DELETE_BUCKETLIST: "/api/bucketList/delete-bucket-list",
  EDIT_BUCKETLIST: "/api/bucketList/edit-bucket-list",

};




export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};
