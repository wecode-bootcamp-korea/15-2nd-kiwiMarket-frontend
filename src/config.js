// APIs

const HOST = "http://192.168.0.3:8000/";
export const HOST2 = "http://192.168.0.81:8000/";

export const ITEM_LIST_API = `${HOST}product`;
export const ITEM_DETAIL_API = `${HOST}product/`;
export const PHONE_AUTH_API = `${HOST2}user/smscheck`;
export const AUTH_CHECK_API = `${HOST2}user/checknum`;
export const SIGN_UP_API = `${HOST2}user/signup`;
export const VALIDATE_NICKNAME_API = `${HOST2}user/checknickname`;
export const SELLER_ITEMS_API = `${HOST}product/selleritems?uploader_id=`; // uploader_id
export const WISH_TOGGLE_API = `${HOST}/product/wishlist?product_id=`;
export const UPDATE_INTERESTED_CATEGORY_API = `${HOST}product/wishcategory`;

// API Key

export const KIWI_REST_API_KEY = "144d5198430a495ccd85d59804cfc7b0";
