import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Redux actions
import { useDispatch, useSelector } from 'react-redux';
import { createNewProductAction } from '../actions/productActions';
import { showAlertAction, hideAlertAction } from '../actions/alertActions';
// useDispatch get the functions and ejecute
// useSelector can manage the state
const NewProduct = () => {

    // Utilice useDispatch and return the function
    const dispatch = useDispatch();
    const history = useHistory();
    
    const addProduct = (product) => dispatch( createNewProductAction(product) );

    const loading = useSelector( (state) => state.products.loading);
    const error = useSelector( (state) => state.products.error);
    const alert = useSelector( (state) => state.alert.alert);

    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);

    const onSubmit = e => {
        e.preventDefault();

        // Validate form
        if(name.trim() === '' || price < 0){
            const alert = {
                msg: 'All fields are required',
                class: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( showAlertAction(alert) );
            return;
        }
        // If there are no errores
        dispatch( hideAlertAction() );

        // Create the new product
        addProduct({
            name,
            price
        });

        // Send to list product
        history.push('/');
    }
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>

                        {alert ? <p className={alert.class}>{alert.msg}</p> : null }

                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="form-group">
                                <label>Product Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Product Name"
                                    name="name"
                                    value={name}
                                    onChange={e => saveName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product Price</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Product Price"
                                    name="price"
                                    value={price}
                                    onChange={e => savePrice( Number(e.target.value)) }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                            >Create</button>
                        </form>

                        { loading ? <p className="text-center">Loading ...</p> : null }
                        { error ? <p className="alert alert-danger p2 m-4 text-center">Ops! Something failed</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewProduct;