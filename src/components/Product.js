import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { deleteProductAction, setEditProductAction } from '../actions/productActions';
const Product = ({product}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteProduct = id => {
        // Ask usser
        Swal.fire({
            title: 'Delete product ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                // Call deleteProductAction
                dispatch( deleteProductAction(id) );
            }
          });
    }

    const editProduct = product => {
        dispatch( setEditProductAction(product) );
        history.push(`/products/edit/${product.id}`);
    }

    const { id, name, price } = product;
    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">$ {price}</span></td>
            <td className="acciones">
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={() => editProduct(product)}
                >Edit</button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => deleteProduct(id)}
                >Delete</button>
            </td>
        </tr>
    );
}
 
export default Product;