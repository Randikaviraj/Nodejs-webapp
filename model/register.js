const mongoose=require('mongoose');

var Registerschema= new mongoose.Schema({
  name:{
      type:String,
      min:4
  },
  age:{
    type: Number, 
    min: 18, 
    index: true 
  },
  email:{
      type:String
  },
  password:{
      type:String,
      min:6,
      index:true
  } 
});

mongoose.model('Register', Registerschema);