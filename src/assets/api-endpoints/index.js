//------------------------ Backend APIs ----------------------//
export const API_URL = {
  /***************** AUTH APIS **********************/
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REGISTER_BRAND: "/api/auth/auth/register/brand",
  REGISTER_INFLUENCER: "/api/auth/auth/register/influencer",
};

//------------------------ Application APIs ----------------------//
export const APP_API_URL = {
  /***************** AUTH APIs **********************/
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/fetch-trips",
  REGISTER_BRAND: "/api/auth/register-brand",
  REGISTER_INFLUENCER: "/api/auth/register-influencer",
};

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};
