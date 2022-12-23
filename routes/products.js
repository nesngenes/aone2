import express from 'express'
import {getProductsBySearch, getProduct, getProducts, createProduct, updateProduct, deleteProduct, getProductsByCategory} from '../controllers/products.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/search', getProductsBySearch);
router.get('/category', getProductsByCategory);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', auth, createProduct);
router.patch('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router