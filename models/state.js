const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const stateSchema = new Schema({
    name:{type:String},
    problem:{type:String},
    children:[{
        name:{type:String},
        answer:{type:String},
        score:{type:Number}
    }],
    url:[{type:String}],
    images:[{type:String}]
});

module.exports = mongoose.model('State',stateSchema);