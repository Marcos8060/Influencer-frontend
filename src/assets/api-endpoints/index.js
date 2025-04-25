//------------------------ Backend APIs ----------------------//
//------------------------ Backend APIs ----------------------//
const baseUrl = 'http://147.78.141.96:8075/api';

export const API_URL = {
  /***************** AUTH APIS **********************/
  LOGIN: `${baseUrl}/auth/login/`,
  LOGOUT: `${baseUrl}/auth/logout/`,
  REFRESH_TOKEN: `${baseUrl}/auth/token/refresh/`,
  REGISTER_BRAND: `${baseUrl}/auth/register/brand/`,
  SEND_OTP: `${baseUrl}/auth/otp/verify/`,
  REQUEST_OTP: `${baseUrl}/auth/otp/request/`,
  REGISTER_INFLUENCER: `${baseUrl}/auth/register/influencer/`,
  ONBOARD_BRAND: `${baseUrl}/brands/onboarding/post/`,

  /***************** INFLUENCER APIS **********************/
  ONBOARD_INFLUENCER: `${baseUrl}/influencers/onboarding/post/`,
  FILTER_INFLUENCER: `${baseUrl}/search/influencers/`,
  MOVE_TO_BUCKET: `${baseUrl}/brands/bucketList/influencers/move/`,
  FETCH_INFLUENCER_DETAILS: `${baseUrl}/auth/users/get/`,
  FETCH_INFLUENCER_PREFERENCES: `${baseUrl}/influencers/preferences/get/`,
  FETCH_INFLUENCER_ONBOARDING: `${baseUrl}/influencers/get/`,
  EDIT_INFLUENCER_DETAILS: `${baseUrl}/auth/users/update/`,
  EDIT_INFLUENCER_PREFENCES: `${baseUrl}/influencers/preferences/update/`,
  EDIT_INFLUENCER_ONBOARDING: `${baseUrl}/influencers/update/`,
  EDIT_PROFILE_PHOTO: `${baseUrl}/medias/upload/`,
  FETCH_INFLUENCERS_IN_BUCKET: `${baseUrl}/search/bucketList/list/influencers/`,

  /***************** BUCKET LIST APIS **********************/
  ADD_BUCKETLIST: `${baseUrl}/brands/bucketList/create/`,
  REMOVE_FROM_BUCKET: `${baseUrl}/brands/bucketList/influencers/remove/`,
  FETCH_BUCKETLIST: `${baseUrl}/search/bucketList/`,
  DELETE_BUCKETLIST: `${baseUrl}/brands/bucketList/delete/`,
  EDIT_BUCKETLIST: `${baseUrl}/brands/bucketList/update/`,

  /***************** CAMPAIGN APIS **********************/
  CREATE_CAMPAIGN: `${baseUrl}/campaigns/create/`,
  CREATE_PRODUCT: `${baseUrl}/productService/user/product/create/`,
  FETCH_BRAND_CAMPAIGNS: `${baseUrl}/campaigns/brand/list/`,
  FETCH_ALL_CAMPAIGNS: `${baseUrl}/campaigns/list/`,
  FETCH_PRODUCTS: `${baseUrl}/productService/user/products/`,
  VIEW_INSIGHTS: `${baseUrl}/socialAccounts/instagram/media/insights/post/`,
  APPLY_CAMPAIGN: `${baseUrl}/campaigns/apply/`,
  ADD_POST_TO_CAMPAIGN: `${baseUrl}/campaigns/posts/add/`,
  FETCH_CAMPAIGN_DETAILS: `${baseUrl}/campaigns/get/`,

  /***************** SOCIALS APIS **********************/
  TIKTOK_LOGIN: `${baseUrl}/auth/tiktok/loginUrl/`,
  TIKTOK_ACCESS_TOKEN: `${baseUrl}/auth/tiktok/accessToken/`,
  TIKTOK_PROFILE_DETAILS: `${baseUrl}/socialAccounts/tiktok/profile/get/`,
  INSTAGRAM_LOGIN: `${baseUrl}/auth/instagram/loginUrl/`,
  INSTAGRAM_ACCESS_TOKEN: `${baseUrl}/auth/instagram/accessToken/`,
  INSTAGRAM_PROFILE_DETAILS: `${baseUrl}/socialAccounts/instagram/profile/get/`,
  FETCH_POSTS: `${baseUrl}/socialAccounts/instagram/media/list/`,
  FETCH_TIKTOK_POSTS: `${baseUrl}/socialAccounts/tiktok/media/list/`,
  FETCH_BRAND_INFLUENCER_PROFILE: `${baseUrl}/influencers/get/`
};



//------------------------ Application APIs ----------------------//
export const APP_API_URL = {
  /***************** AUTH APIs **********************/
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REFRESH_TOKEN: "/api/auth/refresh-token",
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
  FETCH_ALL_CAMPAIGNS: '/api/campaign/fetch-all-campaigns',
  FETCH_PRODUCTS: '/api/campaign/fetch-products',
  VIEW_INSIGHTS: '/api/campaign/view-insights',
  APPLY_CAMPAIGN: '/api/campaign/apply-campaign',
  APPLIED_CAMPAIGNS: '/api/campaign/applied-campaigns',
  APPROVED_CAMPAIGNS: '/api/campaign/approved-campaigns',
  ADD_POST_TO_CAMPAIGN: '/api/campaign/add-post-to-campaign',
  FETCH_CAMPAIGN_DETAILS: '/api/campaign/fetch-campaign-details',


  /***************** BUCKET LIST APIs **********************/
  ADD_BUCKETLIST: "/api/bucketList/create-bucket-list",
  REMOVE_FROM_BUCKET: "/api/bucketList/remove-from-bucket",
  FETCH_BUCKETLIST: "/api/bucketList/fetch-bucket-list",
  DELETE_BUCKETLIST: "/api/bucketList/delete-bucket-list",
  EDIT_BUCKETLIST: "/api/bucketList/edit-bucket-list",

  /***************** SOCIALS APIS **********************/
  TIKTOK_LOGIN: "/api/socials/tiktok/login",
  TIKTOK_ACCESS_TOKEN: "/api/socials/tiktok/auth",
  TIKTOK_PROFILE_DETAILS: "/api/socials/tiktok/tiktok-profile",
  INSTAGRAM_LOGIN: "/api/socials/instagram/login",
  INSTAGRAM_ACCESS_TOKEN: "/api/socials/instagram/auth",
  INSTAGRAM_PROFILE_DETAILS: "/api/socials/instagram/instagram-profile",
  FETCH_POSTS: '/api/socials/instagram/fetch-instagram-posts',
  FETCH_TIKTOK_POSTS: '/api/socials/tiktok/fetch-tiktok-posts',
  FETCH_BRAND_INFLUENCER_PROFILE: '/api/socials/influencer-profile'

};




export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};
