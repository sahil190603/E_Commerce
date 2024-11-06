import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';
const PRODUCTS_API_URL = `${BASE_URL}products/`;
const CATEGORIES_API_URL = `${BASE_URL}categories/`;
const CART_API_URL = `${BASE_URL}cart/`;



// Product API functions
export const fetchProducts = () => axios.get(PRODUCTS_API_URL);
export const fetchProductById = (id) => axios.get(`${PRODUCTS_API_URL}${id}/`);
export const deleteProduct = (id) => axios.delete(`${PRODUCTS_API_URL}${id}/`);
export const createProduct = (formData) => axios.post(PRODUCTS_API_URL, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});
export const updateProduct = (id, productData) => axios.put(`${PRODUCTS_API_URL}${id}/`, productData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
});


// Category API function
export const fetchCategories = () => axios.get(CATEGORIES_API_URL);



// Cart API functions
export const fetchCartItems = (userId) => axios.get(CART_API_URL, {
  headers: {
    'User-ID': userId
  }
});

export const addToCart = (productId, userId) => axios.post(CART_API_URL, {
  product: productId,
  quantity: 1,
}, {
  headers: {
    'User-ID': userId
  }
});

export const removeFromCart = (id, userId) => axios.delete(`${CART_API_URL}${id}/`, {
  headers: {
    'User-ID': userId
  }
});

export const updateCartItemQuantity = (id, quantity, userId) => axios.patch(`${CART_API_URL}${id}/`, {
  quantity
}, {
  headers: {
    'User-ID': userId
  }
});



// Order history api

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}create-order/`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = (userId) => axios.get(`${BASE_URL}orders/`, {
  headers: {
    'User-ID': userId
  }
});


// rating api


export const submitOrderRating = (userId,orderId,product_Id,rating) => {
  debugger
  return axios.post(`${BASE_URL}Ratings/`, {
    user: userId,
    product: product_Id,
    orders: orderId,
    rating: rating,
  });
};













