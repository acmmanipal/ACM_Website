const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new Schema({
    displayName:{
        type:String,
        default:undefined
    },
    regNo:{
        type:String,
        default:undefined
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);
