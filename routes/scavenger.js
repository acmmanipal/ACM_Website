const express=require('express');
const router=express.Router();
const State=require('../models/state');
const ScavengerUser=require('../models/scavenger_user');
const ScavengerLeaderboard=require('../models/scavenger_leaderboard');
const path=require('path');
const crypto=require('crypto');
const mongoose=require('mongoose');
const multer=require('multer');
const GridFsStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const config = require('../config');
const cors=require('./cors');
const authenticate=require('../authenticate');

// Config for image upload

const start=new Date("2020-11-05T00:00:00+05:30");
const end=new Date("2020-11-08T00:00:00+05:30");

let gfs;

mongoose.connection.once('open',()=>{
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "scavenger_image"
  });
});

var storage = new GridFsStorage({
  url: config.MongoUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'scavenger_image'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//end points

router.post('/state',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isAdmin,(req,res,next)=>{
    State.create({name:req.body.name,problem:req.body.problem})
    .then(state=>{
        res.status(200).json({success:true});
    },err=>next(err))
    .catch(err=>next(err));
});

router.get('/state',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isAdmin,(req,res,next)=>{
  State.find()
  .then(states=>{
    res.status(200).json({states:states});
  },err=>next(err))
  .catch(err=>next(err));
});

router.get('/state/image/:state/:filename',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.startForUser(start),(req,res,next)=>{
  if(req.user.admin){
    gfs.find({filename:req.params.filename})
    .toArray((err,files)=>{
      if(err) next(err);
      if(!files||files.length==0) res.status(404).json({sucess:false});
      else{
        const readstream = gfs.openDownloadStreamByName(files[0].filename);
        readstream.pipe(res);
    }
  });
  }else{
    ScavengerUser.findOne({user:req.user._id})
    .then(user=>{
        const state=user.states.filter(state=>state===req.params.state);
        if(state.length==0) {
            console.log(user.states);
            res.status(401).json({success:false});
          }
        else{
      State.findOne({name:req.params.state})
      .then(state=>{
        const files=state.images.filter(image=>image===req.params.filename);
        if(files.length!=0){
          gfs.find({filename:req.params.filename})
          .toArray((err,files)=>{
            if(err) next(err);
            if(!files||files.length==0) res.status(404).json({sucess:false});
            else{
              const readstream = gfs.openDownloadStreamByName(files[0].filename);
              readstream.pipe(res);
          }
        });
        }else{

        }
      },err=>next(err))
      .catch(err=>next(err));
      }
    },err=>next(err))
    .catch(err=>next(err));
  }
});

router.delete('/state',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isAdmin,(req,res,next)=>{
  State.findOneAndDelete({name:req.body.name})
  .then(state=>{
    state.images.map(image=>{
      console.log('Here');
      console.log(image);
      gfs.find({filename:image}).toArray((err,files)=>{
        if(err) next(err);
        else{
          gfs.delete(files[0]._id);
        }
      });
    });
    res.status(200).json({success:true});
  },err=>next(err))
  .catch(err=>next(err));
});

router.put('/children',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isAdmin,(req,res,next)=>{
    State.findOneAndUpdate({name:req.body.name},{
        $push : {
           children :  {
                    name : req.body.child_name,
                    answer : req.body.answer,
                    score : req.body.score
                  } 
         }
       })
       .then(state=>{
        res.status(200).json({success:true});
       },err=>next(err))
       .catch(err=>next(err));
});

router.put('/url',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isAdmin,(req,res,next)=>{
    console.log(req.body);
    State.findOneAndUpdate({name:req.body.name},{
        $push : {
           url : req.body.url 
         }
       })
       .then(state=>{
        res.status(200).json({success:true});
       },err=>next(err))
       .catch(err=>next(err));
});

router.post('/image/:state_name',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isAdmin,upload.single('file'),(req,res,next)=>{
    State.findOneAndUpdate({name:req.params.state_name},{
      $push : {
        images :  req.file.filename 
      }
    })
    .then(state=>{
      res.status(200).json({success:true});
    },err=>next(err))
    .catch(err=>next(err));
});

router.get('/user_state',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isLoggedIn,authenticate.startForUser(start),(req,res,next)=>{
  const date=new Date();
  ScavengerUser.findOne({user:req.user._id})
  .then(user=>{
    if(!user){
      return ScavengerUser.create({user:req.user._id,score:0,lastModified:date,states:['The Beginning']})
      .then(user=>user,err=>next(err))
      .then(user=>{
        if(req.user.admin||date>end){
          return user;
        }else{
          return ScavengerLeaderboard.create({username:req.user.username,displayName:req.user.displayName,lastModified:date,score:0})
          .then(leader=>user,err=>next(err))
          .catch(err=>next(err));
        }
      },err=>next(err))
      .catch(err=>next(err));
    }else{
      return user;
    }
  },err=>next(err))
  .then(user=>{
    State.find({name:{$in: user.states }})
    .then(states=>{
        const clean_states=states.map(state=>({name:state.name,problem:state.problem,url:state.url,images:state.images}));
        res.status(200).json({score:user.score,states:clean_states});
    },err=>next(err))
    .catch(err=>next(err));
  },err=>next(err))
  .catch(err=>next(err));
});

router.post('/answer',cors.corsWithOptions,authenticate.isLoggedIn,authenticate.isLoggedIn,authenticate.startForUser(start),(req,res,next)=>{
 const date=new Date();
  ScavengerUser.findOne({user:req.user._id})
 .then(user=>{
   const state=user.states.filter(state=>state===req.body.state);
   if(state.length==0) {
      console.log(user.states);
      res.status(401).json({success:false});
    }
   else{
      State.findOne({name:req.body.state})
      .then(state=>{
        var new_path;
        const nextState=state.children.filter(child=>(child.answer.trim().toLowerCase())===(req.body.answer.trim().toLowerCase()));
        if(nextState.length===1){
            new_path={name:req.body.state,child:nextState[0].name};
        }
        console.log(JSON.stringify(user.paths));
        console.log(JSON.stringify(req.body));
        console.log(JSON.stringify(user.paths.filter(path=>(path.state===req.body.state&&path.child===nextState[0].name))));
        console.log(JSON.stringify(nextState));
        if(nextState.length==0||user.paths.filter(path=>(path.name===req.body.state&&path.child===nextState[0].name)).length>0){
          res.status(200).json({correct:false,newState:null,level_score:0,total:user.score});
        }else{
          ScavengerUser.findOneAndUpdate({user:req.user._id},{
            $push:{
              states:nextState[0].name,
              paths:new_path
            },
            score:user.score+nextState[0].score,
            lastModified:date
          })
          .then(user_mod=>{
            if(req.user.admin||date>end){
              console.log('******Here**************');
              res.status(200).json({correct:true,newState:nextState[0].name,level_score:nextState[0].score,total:user.score+nextState[0].score});
            }
            else{
              ScavengerLeaderboard.findOneAndUpdate({username:req.user.username},{score:user.score+nextState[0].score,lastModified:date})
              .then(leader=>{
                res.status(200).json({correct:true,newState:nextState[0].name,level_score:nextState[0].score,total:user.score+nextState[0].score});
              },err=>next(err))
              .catch(err=>next(err));
            }
          },err=>next(err))
          .catch(err=>next(err));
        }
    },err=>next(err))
    .catch(err=>next(err));
  }  
 },err=>next(err))
 .catch(err=>next(err));
});

router.get('/leaderboard',cors.corsWithOptions,(req,res,next)=>{
  ScavengerLeaderboard.find().sort({score:-1,lastModified:1})
  .then(leaders=>{
    res.status(200).json({leaders:leaders});
  },err=>next(err))
  .catch(err=>next(err));
});




module.exports=router;