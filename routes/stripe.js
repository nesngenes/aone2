import express from 'express'
import { stripeCheckout } from '../controllers/stripe.js';
const router = express.Router()
import auth from '../middleware/auth.js';



router.post('/create-checkout-session', auth, stripeCheckout);

export default router
