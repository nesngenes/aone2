import express from 'express'
import { addItemsAmount, addItemsToCart, getCartItems, removeItemsFromCart, subItemsAmount } from '../controllers/cart.js';
const router = express.Router()

import auth from '../middleware/auth.js';

router.get('/', auth, getCartItems);
router.get('/:id', auth, addItemsToCart);
router.delete('/:id', auth, removeItemsFromCart);
router.patch('/add/:id', auth, addItemsAmount);
router.patch('/sub/:id', auth, subItemsAmount);


export default router
