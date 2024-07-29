const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true,
    },
    redirecturl:{
        type:String,
        required:true,
    },
    visit_hist:[
        {
            timestamp:{type:Number}
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},
{
    timestamps:true
})

const URL= mongoose.model("URL",urlSchema);

module.exports=URL;