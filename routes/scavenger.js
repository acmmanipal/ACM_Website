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

let gfs;

mongoose.connection.once('open',()=>{
  gfs = Grid(mongoose.connection.db,mongoose.mongo);
  gfs.collection('scavenger_image');
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

router.post('/state',cors.corsWithOptions,(req,res,next)=>{
    State.create({name:req.body.name,problem:req.body.problem})
    .then(state=>{
        res.status(200).json({success:true});
    },err=>next(err))
    .catch(err=>next(err));
});

router.get('/state',cors.corsWithOptions,(req,res,next)=>{
  var images;
  var states;
  State.find()
  .then(tar=>{
    states=tar;
  },err=>next(err))
  .then(()=>{
    gfs.files.find().toArray((err,files)=>{
      if(err){
        next(err);
      }  
      images=files; 
      res.status(200).json({states:states,images:images});
    });
  },err=>next(err))
  .catch(err=>next(err));
});

router.get('/state/image/:state/:filename',(req,res,next)=>{
  gfs.files.findOne({filename:req.params.filename})
  .then(file=>{
    if(!file) res.status(404).json({sucess:false});
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  })
});

router.delete('/state',cors.corsWithOptions,(req,res,next)=>{
  State.findOneAndDelete({name:req.body.name})
  .then(state=>{
    state.images.forEach(image=>{
      gfs.remove({filename:image},err=>next(err));
    },err=>next(err))
    .catch(err=>next(err));
  },err=>next(err))
  .catch(err=>next(err));
});

router.put('/children',cors.corsWithOptions,(req,res,next)=>{
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

router.put('/url',cors.corsWithOptions,(req,res,next)=>{
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

router.post('/image/:state_name',cors.corsWithOptions,upload.single('file'),(req,res,next)=>{
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

router.get('/user_state',cors.corsWithOptions,authenticate.isLoggedIn,(req,res,next)=>{
  ScavengerUser.findOne({user:req.user._id})
  .then(user=>{
    if(!user){
      return ScavengerUser.create({user:req.user._id,score:0,states:['start']})
      .then(user=>user,err=>next(err))
      .catch(err=>next(err));
    }else{
      return user;
    }
  },err=>next(err))
  .then(user=>{
    State.find({name:{$in: user.states }})
    .then(states=>{
        const clean_states=states.map(state=>({name:state.name,problem:state.problem,url:state.url,images:state.images}));
        res.status(200).json({states:clean_states});
    },err=>next(err))
    .catch(err=>next(err));
  },err=>next(err))
  .catch(err=>next(err));
});

router.post('/answer',cors.corsWithOptions,authenticate.isLoggedIn,(req,res,next)=>{
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
        const nextState=state.children.filter(child=>child.answer===req.body.answer);
        if(nextState.length==0||user.states.filter(state=>state===nextState[0].name).length===1){
          res.status(200).json({correct:false,newState:null,level_score:0,total:user.score});
        }else{
          ScavengerUser.findOneAndUpdate({user:req.user._id},{
            $push:{
              states:nextState[0].name
            },
            score:user.score+nextState[0].score,
            lastModified:new Date()
          })
          .then(user_mod=>{
            res.status(200).json({correct:true,newState:nextState[0].name,level_score:nextState[0].score,total:user_mod.score});
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
  ScavengerLeaderboard.deleteMany({})
  .then(()=>{
    return ScavengerUser.find().sort({score:-1,lastModified:1}).populate('user');
  })
  .then(records=>{
    const clean_records=records.map(record=>({displayName:record.user.displayName,lastModified:record.lastModified,username:record.user.username,score:record.score}));
    ScavengerLeaderboard.insertMany(clean_records)
    .then((leaders)=>{
      res.status(200).json({leaders:leaders});
    },err=>next(err))
    .catch(err=>next(err));
  },err=>next(err))
  .catch(err=>next(err));
});




module.exports=router;