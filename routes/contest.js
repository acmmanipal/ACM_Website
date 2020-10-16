const express = require('express');
const router = express.Router();
const Contest = require('../models/contest');

router.get('/',(req,res,next)=>{
    Contest.find({}).then(
        (contests)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(contests);
        },err=>next(err)
    ).catch(err=>next(err));
});

router.post('/',(req,res,next)=>{
    Contest.find({name:req.body.name})
    .then((arr)=>{
        if(arr.length!=0){
            res.statusCode=403;
            res.statusMessage='Contest with Name Exists';
            res.end('Contest with Name Exists');
        }else{
            Contest.create(req.body)
            .then(contest=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(contest);
            },err=>next(err)).catch(err=>next(err));
        }
    },err=>next(err)).catch(err=>next(err));
});

router.delete('/',(req,res,next)=>{
    Contest.findOneAndDelete({name:req.body.name})
    .then(contest=>{
        res.statusCode=200;
    },err=>next(err)).catch(err=>next(err));
});

module.exports=router;