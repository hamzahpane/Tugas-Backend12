const ProductRout = require('express').Router();
const productControl = require('../controler/productCont');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

ProductRout.get('/products', productControl.getProduct);
ProductRout.get('/products/:id', productControl.getProductByid);
ProductRout.post('/products', upload.single('image'), productControl.saveProduct);
ProductRout.patch('/products/:id', upload.single('image'), productControl.updateProduct);
ProductRout.delete('/products/:id', productControl.deleteProduct);
module.exports = ProductRout;
