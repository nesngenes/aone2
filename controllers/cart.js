import express from 'express';
import mongoose from 'mongoose';

import ProductMessage from '../models/productModel.js';
import CartMessage from '../models/cart.js';

const router = express.Router();

export const addItemsToCart = async (req, res) => {
    // get item

    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');
    const product = await ProductMessage.findById(id);    
    
    const itemPrice = product.price;
    const itemName = product.productName;
    const itemAmount = 1;
    const itemId = id;
    const itemImage = product.selectedFile;
    
    
    const allItems =  await CartMessage.find()
    
    const creatorItems = allItems.map((i) => {
        if(i.creator === req.userId) {
            return i.itemId
        }
    })
    
    let alreadyExist = false;
    
    const sama = creatorItems.map((i) => {
        if(i === id) {
            return alreadyExist = true;
        }
    })


    // old code 
    
    // const existingItems = await CartMessage.find({id})
    

    
    // existingItems.map((i) => {
    //     if(i.itemId === id) {
    //         return alreadyExist = true;
    //     } 
    // })
    
    try {
        if(!alreadyExist){
            const newCartItems = new CartMessage({itemPrice, itemName, itemAmount, itemId, itemImage, creator: req.userId})
            
            await newCartItems.save()
            
            res.json(newCartItems)
        } else {
            // add items amount 
            console.log('already exist')
            res.json({message: 'items already in the cart'})
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getCartItems = async (req, res) => {
    try {
        const items = await CartMessage.find()

        
        const thisUserItems =  items.filter((item) => item.creator === req.userId)

        let calcPrice = 0; 
        let itemTotalPrice = [];
        let totalPrice = 0;
        
        thisUserItems.map((item) => {
            calcPrice = item.itemAmount * item.itemPrice;
            
            itemTotalPrice.push(calcPrice);    
            
            totalPrice += calcPrice;
        })
                
        let totalAmount = 0;
        let itemTotalAmount = [];
        
        
        thisUserItems.map((item) => {
            totalAmount += item.itemAmount;
            itemTotalAmount.push(item.itemAmount);
        })

        res.status(200).json({data: thisUserItems, itemTotalPrice, itemTotalAmount, totalPrice, totalAmount})


    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const addItemsAmount = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No items with that id');
    const item = await CartMessage.findById(id)

    item.itemAmount += 1;

    const updatedItem = await CartMessage.findByIdAndUpdate(id, item, {new: true})

    res.status(200).json({data: updatedItem})
}

export const subItemsAmount = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No items with that id');
    const item = await CartMessage.findById(id)

    if(item.itemAmount > 1) {
        item.itemAmount -= 1;
    }

    const updatedItem = await CartMessage.findByIdAndUpdate(id, item, {new: true})

    res.json(updatedItem)
}

export const removeItemsFromCart = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No items with that id');
    await CartMessage.findByIdAndRemove(id)
    res.json({message: 'Items deleted from cart'})
}

export default router;