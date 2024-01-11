import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const response = await axios.get("http://localhost:5000/products");
        setProduct(response.data);
        // Set filteredProducts to the initial product list
        setFilteredProducts(response.data);
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            getProduct();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        // Filter products based on the searchKeyword
        const filtered = product.filter((item) =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="columns">
            <div className="column is-half" style={{ marginLeft: "100px", marginTop: "50px" }}>
                <Link to="add" className="button is-success">
                    Add New
                </Link>
                <div className="search" style={{ marginTop: "40px" }}>
                    <input
                        type="text"
                        placeholder="Masukan kata kunci..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button className="button is-info" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <table className="table is-striped is-fullwidth mt-5">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stok}</td>
                                <td>{product.status}</td>
                                <td>
                                    <img src={product.image_url} alt={product.name} style={{ maxWidth: "100px" }} />
                                </td>
                                <td style={{ flexDirection: "row" }}>
                                    <Link to={`edit/${product._id}`} className="button is-info is-small">
                                        Edit
                                    </Link>
                                    <Link to={`detail/${product._id}`} className="button is-info is-small">
                                        Detail
                                    </Link>
                                    <button onClick={() => deleteProduct(product._id)} className="button is-danger is-small">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
