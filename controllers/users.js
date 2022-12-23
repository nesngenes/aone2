import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import UserModal from '../models/user.js';
dotenv.config()

const secret = 'test'

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const oldUser = await UserModal.findOne({email});
        if(!oldUser) return res.status(404).json({message: "User does not exist"});

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, process.env.SECRET, {expiresIn: "1h"});

        res.status(200).json({result: oldUser, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})        
    }
}


export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstname, lastname} = req.body;
    try {
        const existingUser = await UserModal.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        if(password !== confirmPassword) return res.status(400).json({message: "wrong password"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({email, password: hashedPassword, name: `${firstname} ${lastname}`});

        const token = jwt.sign({email: result.email, id:result._id}, process.env.SECRET, {expiresIn: "1h"});

        res.status(200).json({result, token});

    } catch (error) {
        console.log(error)
    }
}