import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stok, setStok] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    const getProductByid = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
      setStok(response.data.stok);
      setStatus(response.data.status);
      setImage(response.data.image);
    };
  
    getProductByid();
  }, [id]);
  

  const updateProduct = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stok", stok);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }
  
      console.log(formData); // Log FormData untuk memeriksa apakah gambar terkirim dengan benar
  
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="columns">
      <div className="column is-half">
        <form onSubmit={updateProduct}>

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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
