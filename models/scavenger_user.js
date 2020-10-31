const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const User=require('./user');

const scavengerUserSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    states:[{type:String}],
    score:{type:Number},
    lastModified:{type:Date}
});

module.exports = mongoose.model('ScavengerUser',scavengerUserSchema);