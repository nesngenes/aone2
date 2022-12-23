import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: String,
    message: String,
    creator: String,
    category: String,
    name: String,
    price: Number,
    description: String,
    selectedFile: String,
    comments: {type: [String], default: []},
    createdAt: {
        type: Date, 
        default: new Date()
    }
})

var ProductMessage = mongoose.model('ProductMessage', productSchema);

export default ProductMessage