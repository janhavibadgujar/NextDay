const mongoose=require('mongoose');

const postSchema=mongoose.Schema(
{
    Input:{
        type:String,
        required:true
    },
    outputDay:{
        type:String,
        required:true
    },
    outputDate:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('Posts',postSchema);