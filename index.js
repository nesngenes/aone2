import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'


import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// routes

import productsRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import cartRoutes from './routes/cart.js';
import stripe from './routes/stripe.js';

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))


app.use('/aone/products', productsRoutes);
app.use('/aone/products/cart/items', cartRoutes);
app.use('/aone/user', userRoutes);
app.use('/aone/products/cart/items', stripe)


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req,res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        )
    })
} else {
    app.get('/', (req,res) => {
        res.send('API IS RUNNING');
    })
}





const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));