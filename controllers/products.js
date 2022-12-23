import express from 'express'
import mongoose from 'mongoose';

import ProductMessage from '../models/productModel.js';

const router = express.Router();


export const createProduct = async (req, res) => {
    const product = req.body;
    const newProductMessage = new ProductMessage({...product, creator: req.userId, createdAt: new Date().toISOString()})

    try {
        await newProductMessage.save();

        res.status(201).json(newProductMessage);
    } catch (error) {
        res.status(409).json({message: error.message})   
    }
}


export const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await ProductMessage.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const getProducts = async(req, res) => {
    const {page} = req.query;
    try {
        const LIMIT = 4;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await ProductMessage.countDocuments({});
        
        const products = await ProductMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: products, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const updateProduct = async (req, res) => {
    const {id: _id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No product with that id');
    const updatedProduct = await ProductMessage.findByIdAndUpdate(_id, {...product, _id}, {new: true});
    res.json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No product with that id');
    await ProductMessage.findByIdAndRemove(id);
    console.log('DELETE');
    res.json({message: 'Product deleted'})
}

export const getProductsByCategory = async (req, res) => {
    const {category} = req.query;
    try {
        const products = await ProductMessage.find({category})
        res.json({data: products});
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getProductsBySearch = async (req, res) => {
    const {searchQuery} = req.query;

    try {
        const productName = new RegExp(searchQuery, 'i');
        const products = await ProductMessage.find({productName});
        res.json({data: products})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export default router;