const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config = require('./config');
const { token } = require('morgan');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const extractFromBody=(req)=>{
    if(req && req.body.token) return req.body.token;
    else return null;
}

opts={
    secretOrKey:config.secretKey,
    jwtFromRequest:extractFromBody
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
        res.statusCode=471;
        res.setHeader('Content-Type','application/json');
        res.json({errCode:100,success:false,msg:'Not Logged In'});
    }
};

exports.isAdmin=(req,res,next)=>{
    if(req.user.admin){
        next();
    }else{
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.json({errCode:101,success:false,msg:'Not Admin'});
    }
};

exports.startForUser = (start)=>(req,res,next)=>{
    const date=new Date();
    if(date>=start||req.user.admin){
        next();
    }else{
        res.status('401').json({success:false});
    }
};
