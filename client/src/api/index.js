import axios from 'axios'
import Product from '../components/Products/Product/Product';

const API = axios.create({baseURL:  '/aone/'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

// products

export const fetchProduct = (id) => API.get(`${id}`);
export const fetchProducts = (page) => API.get(`products?page=${page}`);
export const createProduct = (newProduct) => API.post('products', newProduct);
export const updateProduct = (id, updateProduct) => API.patch(`products/${id}`, updateProduct);
export const deleteProduct = (id) => API.delete(`products/${id}`);
export const comment = (value, id) => API.post(`products/${id}/commentProduct`, {value});

// auth

export const signIn = (formData) => API.post('user/signin', formData);
export const signUp = (formData) => API.post('user/signup', formData);


// find certain post

export const fetchProductsBySearch = (searchQuery) => API.get(`products/search?searchQuery=${searchQuery.search || 'none'}`);
export const fetchProductsByCategory = (category) => API.get(`products/category?category=${category}`, category);

// cart

export const getCartItems = () => API.get(`products/cart/items`);
export const addCartItems = (id) => API.get(`products/cart/items/${id}`);
export const addItemsAmount = (id) => API.patch(`products/cart/items/add/${id}`);
export const subItemsAmount = (id) => API.patch(`products/cart/items/sub/${id}`);
export const deleteCartItems = (id) => API.delete(`products/cart/items/${id}`);


// stripe 

export const stripeCheckout = () => API.post(`products/cart/items/create-checkout-session`)