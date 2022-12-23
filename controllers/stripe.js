import Stripe from 'stripe';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import CartMessage from '../models/cart.js';

dotenv.config()

export const stripeCheckout = async (req, res) => {

    const stripe = Stripe(process.env.STRIPE_KEY)

    const allItems = await CartMessage.find();

    const creatorItems = allItems.filter((i) => i.creator === req.userId)


    // HARUS FIND ITEM YANG DIMILIKI OLEH THIS USER PAKE REQ USERID OR WTV
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            
            line_items: creatorItems.map((i) => {
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: i?.itemName
                            },
                            unit_amount: i?.itemPrice * 100,
                        },
                        quantity: i?.itemAmount,
                    }
            }),
            success_url: `${process.env.CLIENT_URL}payment-success`,
            cancel_url: `${process.env.CLIENT_URL}payment-failed`,
        })
        
        res.json({url: session.url})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}