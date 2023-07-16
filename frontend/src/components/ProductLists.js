import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const ProductLists = () => {

    const [Products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async() =>{
        const response = await axios.get("https://aws.connect.psdb.cloud:5000/products");
        setProducts(response.data);
    }
    
    const deleteProduct = async(productId)=>{
        try {
            await axios.delete(`https://aws.connect.psdb.cloud:5000/products/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='container mt-5'>
            <Link to={"add"} className="button is-success mb-5">Add New</Link>
            <div className="columns is-multiline">
                {Products.map((product)=>(
                    <div className="column is-one-quarter" key={product.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                <img src={product.url} alt="Image" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{product.product_name}</p>
                                    </div>
                                </div>
                            </div>
                            <footer className='card-footer'>
                                <Link to={`edit/${product.id}`} className='card-footer-item'>Edit</Link>
                                <a onClick={()=> deleteProduct(product.id)} className='card-footer-item'>Delete</a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductLists