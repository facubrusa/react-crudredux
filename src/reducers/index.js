import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import alertReducer from './alertReducer';

// If I want to use more than one reducer, use combineReducers()
export default combineReducers({
    products: productsReducer,
    alert: alertReducer
});