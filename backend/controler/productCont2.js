// const { ObjectId } = require('bson');
// const db = require('../config/mongodb');
// const path = require('path');
// const fs = require('fs');


// const getProduct = (req, res) => {
//     db.collection('products').find()
//         .toArray()
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
// };

// const getProductByid = (req, res) => {
//     const { id } = req.params;
//     db.collection('products').find({ _id: new ObjectId(id) }) // tambahkan 'new' di sini
//         .toArray()
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
// };




// const saveProduct = async (req, res) => {
//     const { name, price, stok, status } = req.body;
//     const image = req.file;

//     if (image) {
//         const target = path.join(__dirname, '../uploads', image.originalname);
//         fs.renameSync(image.path, target);
//         db.collection('products').insertOne({ name, price, stok, status, image_url: `http://localhost:5000/public/${image.originalname}`})
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
//     }}


//     const updatedProduct = async (req, res) => {
//         try {
//             const { name, price, stok, status } = req.body;
//             const image = req.file;
    
//             if (image) {
//                 const target = path.join(__dirname, '../uploads', image.originalname);
//                 fs.renameSync(image.path, target);
    
//                 const productId = req.params.id; // Anda perlu menambahkan ini untuk mendapatkan ID produk dari params
    
//                 const result = await db.collection('products').updateOne(
//                     { _id: new ObjectId(productId) },
//                     {
//                         $set: {
//                             name,
//                             price,
//                             stok,
//                             status,
//                             image_url: `http://localhost:5000/public/${image.originalname}`
//                         }
//                     }
//                 );
    
//                 res.send(result);
//             } else {
//                 res.status(400).send("Image not provided");
//             }
//         } catch (error) {
//             res.status(500).send(error.message || "Internal Server Error");
//         }
//     };
    

//     const deleteProduct = async (req, res) => {
//         try {
//             const productId = req.params.id;
    
//             const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });
    
//             if (result.deletedCount === 1) {
//                 res.send({ message: "Product deleted successfully" });
//             } else {
//                 res.status(404).send({ error: "Product not found" });
//             }
//         } catch (error) {
//             res.status(500).send(error.message || "Internal Server Error");
//         }
//     };
    

// module.exports = { getProduct, getProductByid, saveProduct , updatedProduct , deleteProduct};


