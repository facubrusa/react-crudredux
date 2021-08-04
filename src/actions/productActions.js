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

import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

// Create new product
export function createNewProductAction(product) {
    return async (dispatch) => {
        // Change loading to true
        dispatch ( addProduct() );
        
        try {
            // Send product to API
            await clientAxios.post('/products', product);
            // Update the state and set loading to false
            dispatch( addProductSuccess(product) );

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Product registered',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                },
            });
        } catch (error) {
            // Update the loading to false and set error
            dispatch( addProductError(true) );
            Swal.fire({
                title: 'Oops!',
                text: 'Something failed, try again later',
                icon: 'error'
            });
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true 
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product 
});

const addProductError = status => ({
    type: ADD_PRODUCT_ERROR,
    payload: status
});

// Get products
export function getProductsAction() {
    return async (dispatch) => {
        dispatch( getProducts() );

        try {
            const response = await clientAxios.get('/products');
            dispatch( getProductsSuccess(response.data) );
        } catch (error) {
            dispatch( getProductsError() );
        }
    }
}

const getProducts = () => ({
    type: GET_PRODUCTS,
    payload: true
});

const getProductsSuccess = products => ({
    type: GET_PRODUCTS_SUCCESS,
    payload: products
});

const getProductsError = () => ({
    type: GET_PRODUCTS_ERROR,
    payload: true
});

// Delete product
export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch( deleteProduct(id) );

        try {
            await clientAxios.delete(`/products/${id}`);
            dispatch( deleteProductSuccess() );

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Product deleted',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                },
            });
        } catch (error) {
            dispatch( deleteProductError() );
            Swal.fire({
                title: 'Oops!',
                text: 'Something failed, try again later',
                icon: 'error'
            });
        }
    }
}

const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: id
});

const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
});

// Set edit product
export function setEditProductAction(product) {
    return (dispatch) => {
        dispatch( setEditProduct(product) );
    }
}

const setEditProduct = product => ({
    type: SET_EDIT_PRODUCT,
    payload: product
});

// Edit product
export function editProductAction(product) {
    return async (dispatch) => {
        dispatch( editProduct() );

        try {
            await clientAxios.put(`products/${product.id}`, product);
            dispatch( editProductSuccess(product) );
        } catch (error) {
            dispatch( editProductError() );
        }
    }
}

const editProduct = () => ({
    type: EDIT_PRODUCT,
    payload: true
});

const editProductSuccess = product => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
});

const editProductError = () => ({
    type: EDIT_PRODUCT_ERROR,
    payload: true
});