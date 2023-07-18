import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [product_name, setProduct_name] = useState("");
    const [product_image, setProduct_image] = useState("");
    const [preview, setPreview] = useState("");
    const [buy_price, setBuy_price] = useState("");
    const [sell_price, setSell_price] = useState("");
    const [stock, setStock] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductById();
    }, []);

    const getProductById = async()=>{
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct_image(response.data.product_image);
        setPreview(response.data.url);
        setProduct_name(response.data.product_name);
        setBuy_price(response.data.buy_price);
        setSell_price(response.data.sell_price);
        setStock(response.data.stock);
    }

    const loadImage = (e) =>{
        const image = e.target.files[0];
        setProduct_image(image);
        setPreview(URL.createObjectURL(image));
    }

    const updateProduct = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("product_image", product_image);
        formData.append("product_name", product_name);
        formData.append("buy_price", buy_price);
        formData.append("sell_price", sell_price);
        formData.append("stock", stock);
        try {
            await axios.patch(`http://localhost:5000/products/${id}`, formData, {
                headers: {
                    "Content-type" : "multipart/form-data"
                }
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className="label">Product Image</label>
                    <div className="control">
                        <div className="file">
                            <label className="file-label">
                                <input type="file" className="file-input" onChange={loadImage} />
                                <span className="file-cta">
                                    <span className="file-label">Choose a file...</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {preview ? (
                    <figure className="image is-128x128">
                        <img src={preview} alt="Preview product_image" />
                    </figure>
                ) : ("")
                }

                <div className="field">
                    <label className="label">Product Name</label>
                    <div className="control">
                        <input type="text" className="input" value={product_name} onChange={(e)=>setProduct_name(e.target.value)} placeholder='Product Name'/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Buy Price</label>
                    <div className="control">
                        <input type="number" className="input" value={buy_price} onChange={(e)=>setBuy_price(e.target.value)} placeholder='Buy Price'/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Sell Price</label>
                    <div className="control">
                        <input type="number" className="input" value={sell_price} onChange={(e)=>setSell_price(e.target.value)} placeholder='Sell Price'/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Stock</label>
                    <div className="control">
                        <input type="number" className="input" value={stock} onChange={(e)=>setStock(e.target.value)} placeholder='Stock'/>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button type='submit' className="button is-success">Update</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProduct;