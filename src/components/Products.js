import React, { Fragment, useEffect } from 'react';
import Product from './Product';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction } from '../actions/productActions';

const Products = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Consult API
        const getProducts = () => dispatch( getProductsAction() );
        getProducts();
        // eslint-disable-next-line
    }, []);

    const products = useSelector( (state) => state.products.products);
    const loading = useSelector( (state) => state.products.loading);
    const error = useSelector( (state) => state.products.error);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">List of Products</h2>

            { loading ? <p className="text-center">Loading ...</p> : null }
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Ops! Something failed</p> : null }
            
            <table className="table table-stripped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length === 0 ? <tr><td>Empty product list</td></tr> : (
                        products.map(product => (
                            <Product 
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Products;