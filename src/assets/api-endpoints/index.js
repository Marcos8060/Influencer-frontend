//------------------------ Backend APIs ----------------------//
export const API_URL = {
  /***************** AUTH APIS **********************/
  LOGIN: "http://147.78.141.96:8075/api/auth/login/",
  LOGOUT: "http://147.78.141.96:8075/api/auth/logout/",
  REGISTER_BRAND: "http://147.78.141.96:8075/api/auth/register/brand/",
  SEND_OTP: "http://147.78.141.96:8075/api/auth/otp/verify/",
  REQUEST_OTP: "http://147.78.141.96:8075/api/auth/otp/request/",
  REGISTER_INFLUENCER: "http://147.78.141.96:8075/api/auth/register/influencer/",
  ONBOARD_BRAND: "http://147.78.141.96:8075/api/brands/onboarding/post/",


    /***************** INFLUENCER APIS **********************/
  ONBOARD_INFLUENCER: "http://147.78.141.96:8075/api/influencers/onboarding/post/",
  FILTER_INFLUENCER: "http://147.78.141.96:8075/api/search/influencers/",
  MOVE_TO_BUCKET: "http://147.78.141.96:8075/api/brands/bucketList/influencers/move/",
  FETCH_INFLUENCER_DETAILS: "http://147.78.141.96:8075/api/auth/users/get/",
  FETCH_INFLUENCER_PREFERENCES: "http://147.78.141.96:8075/api/influencers/preferences/get/",
  FETCH_INFLUENCER_ONBOARDING: "http://147.78.141.96:8075/api/influencers/get/",
  EDIT_INFLUENCER_DETAILS: "http://147.78.141.96:8075/api/auth/users/update/",
  EDIT_INFLUENCER_PREFENCES: "http://147.78.141.96:8075/api/influencers/preferences/update/",
  EDIT_INFLUENCER_ONBOARDING: "http://147.78.141.96:8075/api/influencers/update/",
  EDIT_PROFILE_PHOTO: "http://147.78.141.96:8075/api/medias/upload/",
  FETCH_INFLUENCERS_IN_BUCKET: "http://147.78.141.96:8075/api/search/bucketList/list/influencers/",

    /***************** BUCKELT LIST APIS **********************/
    ADD_BUCKETLIST: "http://147.78.141.96:8075/api/brands/bucketList/create/",
    FETCH_BUCKETLIST: "http://147.78.141.96:8075/api/search/bucketList/",
    DELETE_BUCKETLIST: "http://147.78.141.96:8075/api/brands/bucketList/delete/",
    EDIT_BUCKETLIST: "http://147.78.141.96:8075/api/brands/bucketList/update/",


    /***************** CAMPAIGN APIS **********************/
    CREATE_CAMPAIGN: "http://147.78.141.96:8075/api/campaigns/create/",
    CREATE_PRODUCT: "http://147.78.141.96:8075/api/productService/user/product/create/",
    FETCH_BRAND_CAMPAIGNS: "http://147.78.141.96:8075/api/campaigns/brand/list/",
    FETCH_PRODUCTS: "http://147.78.141.96:8075/api/productService/user/products/",
};


//------------------------ Application APIs ----------------------//
export const APP_API_URL = {
  /***************** AUTH APIs **********************/
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REGISTER_BRAND: "/api/auth/register-brand",
  SEND_OTP: "/api/auth/otp",
  REQUEST_OTP: "/api/auth/otp/request-otp",
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
  EDIT_INFLUENCER_PREFERENCES: "/api/influencer/profile/edit-influencer-preferences",
  EDIT_INFLUENCER_ONBOARDING: "/api/influencer/profile/edit-influencer-onboarding",
  EDIT_PROFILE_PHOTO: "/api/influencer/profile/upload-photo",
  FETCH_INFLUENCERS_IN_BUCKET: '/api/bucketList/fetch-influencers-in-bucket',


    /***************** CAMPAIGN APIS **********************/
  CREATE_CAMPAIGN: '/api/campaign/create-campaign',
  CREATE_PRODUCT: '/api/campaign/create-product',
  FETCH_BRAND_CAMPAIGNS: '/api/campaign/fetch-brand-campaigns',
  FETCH_PRODUCTS: '/api/campaign/fetch-products',


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
