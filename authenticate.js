const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config = require('./config');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

opts={
    secretOrKey:config.secretKey,
    jwtFromRequest:ExtractJwt.fromUrlQueryParameter()
};

passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    User.findOne({_id:jwt_payload._id})
    .then(user=>{
        if(user){
            done(null,user);
        } else {
            done(null,false);
        }
    },err=>done(err,false))
    .catch(err=>done(err,false));
}));

exports.getToken=(user)=>{
    return jwt.sign(user,config.secretKey,{expiresIn:600});
};

exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.json({success:false,msg:'Not Logged In'});
    }
};

exports.isAdmin=(req,res,next)=>{
    if(req.user.isAdmin){
        next();
    }else{
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.json({success:false,msg:'Not Admin'});
    }
};