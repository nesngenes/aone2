import {FETCH_ALL, FETCH_BY_CATEGORY, FETCH_PRODUCT, COMMENT, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH} from '../constants/actionTypes'

import * as api from '../api'

// Action Creators 

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const {data} = await api.fetchProduct(id);
        
        console.log(data);

        dispatch({type: FETCH_PRODUCT, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}

export const getProducts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data: {data, currentPage, numberOfPages}} = await api.fetchProducts(page);

        dispatch({type: FETCH_ALL, payload: {data, currentPage, numberOfPages}})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}



export const createProduct = (product, navigate) => async (dispatch) => {
    try {
        const {data} = await api.createProduct(product);
        navigate(`/aone/products`);
        dispatch({type: CREATE, payload: data})        
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = (id, product, navigate) => async (dispatch) => {
    try {
        const {data} = await api.updateProduct(id, product);
        dispatch({type: UPDATE, payload: data})
        navigate(`/aone/products`)
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);
        dispatch({type: DELETE, payload: id})
        console.log('HITED')
    } catch (error) {
        console.log(error)
    }
}

export const commentProduct = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value, id);
        dispatch({type: COMMENT, payload: data})
        return data.comments
    } catch (error) {
        console.log(error)
    }
}

export const getProductsByCategory = (category) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchProductsByCategory(category);
        dispatch({type: FETCH_BY_CATEGORY, payload: data})
        console.log(data)
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)    
    }
}
export const getProductsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchProductsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        console.log(data)
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

