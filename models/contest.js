const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const contestSchema=new Schema({
    name:{type:String},
    description:{type:String},
    start:{type:Date},
    end:{type:Date}
});

module.exports=mongoose.model('Contest',contestSchema);