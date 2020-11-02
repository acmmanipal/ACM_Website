var express = require('express');
const passport = require('passport');
var router = express.Router();
const nodemailer=require('nodemailer');
const User = require('../models/user');
const config = require('../config');
const authenticate = require('../authenticate');
const cors=require('./cors');

function login(){
  alert('Here');
  fetch(config.hostname+'/api/users/jwt_login?auth_token='+token,
  {
    method:'GET',
    credentials:'include'
  }
  ).then(response=>{
    if(response.ok) alert('congrats');
  });
}

async function mail(user){
  const transporter = nodemailer.createTransport({
    host: "manipal.acm.org",
    port: 465,
    secure: true,
    auth: {
      user: config.username, 
      pass: config.password
    },
  });
  const token=authenticate.getToken({_id:user._id});
  const html=`
  <body>
  <h3>Login</h3>
  <input type="button" onclick="login()">Login</input>
  <script>
  function login(){
    alert('Here');
    fetch(\'${config.hostname+'/api/users/jwt_login?auth_token='+token}\',
    {
      method:\'GET\',
      credentials:\'include\'
    }
    ).then(response=>{
      if(response.ok) alert(\'congrats\');
    });
  }
  </script>
  </body>
  `;
  const info = await transporter.sendMail({
    from: '"ACM Manipal" <welcome@manipal.acm.org>',
    to: user.username, 
    subject: "Forgot Password", 
    html: `<h3>Token</h3> : ${token}<br/><p>Token only valid for 10 minutes</p>`
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

router.post('/register',cors.corsWithOptions,(req,res,next)=>{
  User.register(new User({username:req.body.username}),req.body.password)
  .then(user=>{
    if(req.body.displayName) user.displayName=req.body.displayName;
    if(req.body.regNo) user.regNo=req.body.regNo;
    user.save()
    .then(
      passport.authenticate('local')(req,res,()=>{
          //mail(user);
          res.statusCode=200; 
          res.setHeader('Content-Type','application/json');
          res.json({success:true});
      })
    ,err=>next(err))
    .catch(err=>next(err));
  },err=>next(err))
  .catch(err=>next(err));
});

router.post('/login',cors.corsWithOptions,passport.authenticate('local'),(req,res,next)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,user:req.user});
});

router.get('/logout',cors.corsWithOptions,(req,res,next)=>{
  req.logOut();
  res.status(200).json({success:true});
});

router.post('/token',cors.corsWithOptions,(req,res,next)=>{
  User.findOne({username:req.body.username})
  .then(user=>{
    if(user){
    mail(user)
    .then(()=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({success:true});
    },err=>next(err))
    .catch(err=>next(err));
    }else{
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      res.json({success:false});
    } 
  },err=>next(err))
  .catch(err=>next(err));
});

router.post('/jwt_login',cors.corsWithOptions,passport.authenticate('jwt'),(req,res,next)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,user:req.user});
});

module.exports = router;
