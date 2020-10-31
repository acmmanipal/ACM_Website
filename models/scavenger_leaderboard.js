const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const scavengerLeaderboardSchema = new Schema({
    username:{type:String},
    displayName:{type:String},
    score:{type:Number},
    lastModified:{type:Date}
});

module.exports = mongoose.model('ScavengerLeaderboard',scavengerLeaderboardSchema);