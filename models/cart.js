import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    itemName: String,
    itemId: String,
    itemImage: String,
    itemPrice: Number, 
    itemAmount: Number,
    totalPrice: Number,
    totalAmount: Number,
    creator: String,
})

var CartMessage = mongoose.model('CartMessage', cartSchema);

export default CartMessage;