import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

    const AddProduct = () => {
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [stok, setStok] = useState("");
        const [status, setStatus] = useState("");
        const [image, setImage] = useState(null); // Menambah state untuk menyimpan file gambar

    const navigate = useNavigate();

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const saveProduct = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(); // Membuat objek FormData untuk mengirim data formulir termasuk file
            formData.append("name", name);
            formData.append("price", price);
            formData.append("stok", stok);
            formData.append("status", status);
            formData.append("image", image); // Menambahkan file gambar ke FormData

            await axios.post("http://localhost:5000/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Header untuk memberi tahu server bahwa ini adalah formulir dengan unggahan file
                },
            });

            navigate("/"); // Redirect ke halaman daftar produk setelah berhasil menambahkan produk
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="columns">
            <div className="column is-half">
                <form onSubmit={saveProduct}>
                <div className="field">
            <label className="label">Name</label>
            <div className="control">
            <input 
            type="text" 
            className="input" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
            </div>
        </div>

        <div className="field">
            <label className="label">Price</label>
            <div className="control">
            <input
                type="text" 
                className="input" 
                placeholder="Price" 
                value={price} onChange={(e) => setPrice(e.target.value)}
                
            />
            </div>
        </div>

        <div className="field">
            <label className="label">Stok</label>
            <div className="control">
            <input
                type="text" 
                className="input" 
                placeholder="Stok" 
                value={stok} onChange={(e) => setStok(e.target.value)}
            />
            </div>
        </div>

        <div className="field">
            <label className="label">Status</label>
            <div className="control">
            <input
            type="text" 
            className="input" 
            placeholder="Status" 
            value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
        </div>


                    <div className="field">
                        <label className="label">Replace Image</label>
                        <div className="control">
                            <input
                                type="file"
                                className="input"
                                name="image"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary">
                                Add Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
