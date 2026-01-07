const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type:String, required: true},
    password: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    userType:{type:String, required: true}
});

const adminSchema = new mongoose.Schema({
    banner: {type:String},
    categories:{type:Array}
});

const productSchema = new mongoose.Schema({
    title:{type: String, required: true},
    description:{type:String, required: true},
    mainImg:{type:String, required: true},
    carousel:{type:Array},
    sizes:{type:Array},
    category:{type:String, required: true},
    gender:{type:String},
    price:{type:Number, required: true},
    discount:{type:Number, default: 0}
});

const orderSchema=new mongoose.Schema({
        userId:{type:String, required: true},
        name:{type:String, required: true},
        email:{type:String, required: true},
        mobile:{type:String, required: true},
        address:{type:String, required: true},
        pincode:{type:String, required: true},
        title:{type:String, required: true},
        description:{type:String},
        mainImg:{type:String},
        size:{type:String},
        quantity:{type:Number, required: true},
        price:{type:Number, required: true},
        discount:{type:Number, default: 0},
        paymentMethod:{type:String, required: true},
        orderDate:{type:String, required: true},
        deliveryDate:{type:String},
        orderStatus:{type:String, default:'order placed'}
});

const cartSchema=new mongoose.Schema({
    userId: {type:String, required: true},
    productId: {type:String, required: true},
    title: {type:String, required: true},
    description:{type:String},
    mainImg:{type:String},
    size:{type:String},
    quantity:{type:Number, required: true},
    price:{type:Number, required: true},
    discount:{type:Number, default: 0}
});

module.exports = {
    User: mongoose.model('users',userSchema),
    Admin: mongoose.model('admin',adminSchema),
    Product: mongoose.model('products',productSchema),
    Orders: mongoose.model('orders',orderSchema),
    Cart: mongoose.model('cart',cartSchema)
};