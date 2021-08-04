import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/productActions';

const EditProduct = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [product, saveProduct] = useState({
        id: '',
        name: '',
        price: ''
    });

    const productedit = useSelector( (state) => state.products.productedit);
    useEffect(() => {
        if(productedit) {
            saveProduct(productedit);
        }
    }, [productedit]);

    const { name, price } = product;

    const onSubmit = e => {
        e.preventDefault();

        // Validate form\
        if(name.trim() === '' || price < 0){
            return;
        }

        // Send to editProductAction
        dispatch( editProductAction(product) );

        // Send to list product
        history.push('/');
    }

    const handleChange = e => {
        saveProduct({
            ...product,
            [e.target.name] : e.target.value
        });
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit Product
                        </h2>

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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase
                                d-block w-100"
                            >Confirm changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditProduct;