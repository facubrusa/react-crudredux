import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    SET_EDIT_PRODUCT,
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../types/index';

// Each reducer has it own state
const initialState = {
    products: [],
    error: false,
    loading: false,
    productdelete: null,
    productedit: null
}

function productsReducer(state = initialState, action){
    switch(action.type) {
        case ADD_PRODUCT:
        case GET_PRODUCTS:
        case EDIT_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case ADD_PRODUCT_ERROR:
        case GET_PRODUCTS_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                products: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                productdelete: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                products: state.products.filter(product => product.id !== state.productdelete),
                productdelete: null
            }
        case SET_EDIT_PRODUCT:
            return {
                ...state,
                productedit: action.payload
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                productedit: null,
                products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product )
            }
        default:
            return state;
    }
}

export default productsReducer;