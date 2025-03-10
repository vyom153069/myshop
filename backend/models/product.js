const mongoose =require("mongoose");
const {ObjectId}=mongoose.Schema;
const productSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        require:true,
        maxlength:2000
    },
    price:{
        type:Number,
        require:true,
        maxlength:32,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamp:true});

module.exports=mongoose.model("Product",productSchema);