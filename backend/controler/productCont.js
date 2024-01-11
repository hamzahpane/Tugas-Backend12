const Product = require('../models/productMod');
const path = require('path');
const fs = require('fs');

const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByid = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const saveProduct = async (req, res) => {
    const { name, price, stok, status } = req.body;
    const image = req.file;

    if (image) {
        const target = path.join(__dirname, '../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            const insertedProduct = await Product.create({
                name,
                price,
                stok,
                status,
                image_url: `http://localhost:5000/public/${image.originalname}`
            });
            res.status(201).json(insertedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(400).json({ message: 'Image not provided' });
    }
};


const updateProduct = async (req, res) => {
    const { name, price, stok, status } = req.body;
    const productId = req.params.id;
    const image = req.file;

    console.log(req.file);

    if (image) {
        const target = path.join(__dirname, '../uploads', image.originalname);
        fs.renameSync(image.path, target);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            price,
            stok,
            status,
            image_url: `http://localhost:5000/public/${image.originalname}`,}, { new: true });

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
}
    }
};



const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { getProduct, getProductByid, saveProduct, updateProduct ,deleteProduct };
