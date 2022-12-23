import { FETCH_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART, START_LOADING, END_LOADING } from "../constants/actionTypes";

import * as api from '../api'

export const getCartItems = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        
        const {data: {data, itemTotalPrice, itemTotalAmount, totalPrice, totalAmount} } = await api.getCartItems();
        dispatch({type: FETCH_CART, payload: {data, itemTotalPrice, itemTotalAmount, totalPrice, totalAmount}})

        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }   
}

export const addCartItems = (id, navigate) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const {data} = await api.addCartItems(id);
        console.log(data);
        navigate(`/aone/items`)
        dispatch({type: ADD_TO_CART, payload: data})
        
        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error)
    }

}

export const addItemsAmount = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        
        const {data} = await api.addItemsAmount(id);
        dispatch({type: UPDATE_CART, payload: data})
        
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const substractItemsAmount = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const {data} = await api.subItemsAmount(id);
        dispatch({type: UPDATE_CART, payload: data})

        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const removeCartItems = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        await api.deleteCartItems(id);
        dispatch({type: DELETE_CART, payload: id});

        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const stripeCheckout = () => async (dispatch) => {
    try {
        const url = await api.stripeCheckout();
        window.location.replace(url.data.url)
    } catch (error) {
        console.log(error)
    }
}