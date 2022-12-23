import {FETCH_ALL, FETCH_BY_CATEGORY, FETCH_PRODUCT, COMMENT, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH} from '../constants/actionTypes'

export default (state = {isLoading: true, products: []}, action) => {
    switch(action.type){
        case START_LOADING: 
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case FETCH_ALL: 
            return {
                ...state,
                products: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH: 
            return {...state, products: action.payload}
        case FETCH_BY_CATEGORY: 
            return {...state, products: action.payload}
        case FETCH_PRODUCT: 
            return {...state, product: action.payload}
        case DELETE: 
            return {...state, products: state.products.filter((product) => product._id !== action.payload)}
        case UPDATE: 
            return {...state, products: state.products.map((product) => product._id === action.payload._id ? action.payload : product)}
        case COMMENT: 
            return {
                ...state,
                products: state.products.map((product) => {
                    if(product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                })
            }
        case CREATE: 
            return {...state, products: [...state, action.payload]}
        default: 
            return state
    }
}