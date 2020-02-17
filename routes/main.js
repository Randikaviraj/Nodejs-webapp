const express=require('express');
const mongoose=require('mongoose');
const Register=require('../model/register')

const Regiform=mongoose.model('Register')




const router=express.Router();


router.get('/signup',(req,res)=>{

    res.render("signup",{layout: false,msg:false});
});

router.get('/login',(req,res)=>{
    res.render("login",{layout: false,warn:false});
});

router.get('/terms',(req,res)=>{
    res.render("terms",{});
});

router.post('/save',function(req,res,next){
     console.log(req.body)
    const form=new Regiform();
    form.name=req.body.name;
    form.age=req.body.age;
    form.email=req.body.email;
    form.password=req.body.password;

    Regiform.find({ email: req.body.email},function(err,doc){
        if(err){
            res.redirect('/store/signup');}
     
        if(doc[0]==undefined){
            form.save((err,doc)=>{
                if(!err){
                   
                    res.render('product',{layout: false,msg: false});
        
                }
                else{
                    res.redirect('/store/signup')
                }
            })
           
        }
        else{
            res.render("signup",{layout: false,msg: true});
        }
    });

});

router.post('/login',(req,res)=>{
    Regiform.find({email:req.body.email},function(err,doc,next){
       if(err){ next(err)}
       
       if(doc[0].password==req.body.password){
           res.render('product',{layout: false})
       }
       else{
        res.render("login",{layout: false,warn:true});
       }

    }),function(err){
        console.log(err)
    }
});



module.exports=router;