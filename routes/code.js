const router=require('express').Router();

router.post('/run',(req,res,next)=>{
    var code=req.body.code;
    fs.writeFileSync(path.join(__dirname,'../../code',),code);
});