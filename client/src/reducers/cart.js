import { FETCH_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART, START_LOADING, END_LOADING } from "../constants/actionTypes";

export default (state = {items: [], isLoading: true}, action) => {
    switch(action.type){
        case START_LOADING: 
            return {...state, isLoading: true}
        case END_LOADING: 
            return {...state, isLoading: false}
        case ADD_TO_CART: 
            console.log(state)
            return {
                ...state, 
                items: [...state, action.payload]};
        case FETCH_CART: 
            console.log(state)
            return {...state, items: action.payload};
        case UPDATE_CART: 
            console.log(state)
            return {...state, items: state.items.data.map((item) => item._id === action.payload._id ? action.payload: item)}
        case DELETE_CART: 
            return {...state, items: state.items.data.filter((item) => item._id !== action.payload)}
        default: 
            return state;
        }
}