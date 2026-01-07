const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  API_PATH: '/api',
  ENDPOINTS: {
    USERS: '/users',
    PRODUCTS: '/products',
    ORDERS: '/orders',
    CART: '/cart',
    ADMIN: '/admin'
  }
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PATH}${endpoint}`;
};

export { API_CONFIG };
export default API_CONFIG;