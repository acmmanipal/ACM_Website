const express=require('express');
const router=express.Router();
const State=require('../models/state');
const path=require('path');
const crypto=require('crypto');
const mongoose=require('mongoose');
const multer=require('multer');
const GridFsStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const config = require('../config');
const cors=require('./cors');
const { route } = require('.');

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


module.exports=router;