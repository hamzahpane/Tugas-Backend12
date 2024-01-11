import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './index.css';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDetailProduct();
    }, [id]);

    const getDetailProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            setError(error.message || "Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="main">
            <Link to="/" className="btn btn-primary">Back</Link>

            <table className="table">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>: {product._id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>: {product.name}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>: {product.price}</td>
                    </tr>
                    <tr>
                        <td>Stock</td>
                        <td>: {product.stok}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>: {product.status}</td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>: <img src={product.iamge_url} alt={product.name} style={{ maxWidth: "100px" }} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Detail;
