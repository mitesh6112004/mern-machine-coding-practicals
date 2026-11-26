import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true,
        maxLength : [50,"Product name cannot exceed 50 characters"]
    },
    description : {
        type : String,
        required : [true, "Description is required"],
        trim : true,
        maxLength : [1000, "Description cannot exceed 1000 characters"]
    },
    category: {
        type: String,
        required: [true,"Category is required"],
        lowercase : true,
        trim: true,
        enum : {
            values: ["electronics","clothing","books","home","sports"],
            message : "{VALUE} is not supported category"
        }
    },
    brand : {
        type : String,
        required: [true, "Brand is required"],
        trim: true
    },
    price : {
        type : Number,
        required : [true, "Product price is required"],
        min : [0, "Price cannot be negative"]
    },
    rating : {
        type : Number,
        default : 0,
        min : [0,"Rating must be at least 0"],
        max : [5, "Rating cannot exceed 5"]
    },
    stock : {
        type : Number, 
        required: [true, "Stock is required"],
        default: 0, 
        min : [0,"Stock cannot be negative"]
    }

},{
    timestamps : true
})

const Product = mongoose.model("Product", productSchema);
export default Product ; 