var express=require('express');
var http=require('http');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var expresHdb=require('express-handlebars');
var path=require('path')
const Main=require('./routes/main')
var timeout = require('connect-timeout')
// const Register=require('./model/register')


mongoose.connect('mongodb://localhost:27017/Register', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },(err)=>{
      if(!err){
          console.log("Database succesfully connected");
      }
      else{
          console.log('There is an error...'+err);
      }
  })

const port=3000;
const app=express();
const server=http.createServer(app);

app.use(timeout('5s'));
app.use(haltOnTimedout)

// app.use(express.static('src'));
app.use(express.static(path.join(__dirname+"/src")));

app.set("views",path.join(__dirname+"/views/"));

app.engine('hbs', expresHdb({
    extname:"hbs",
    defaultLayout:"mainlayout",
    layoutsDir:__dirname+'/views/layouts'
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/store',Main);

function haltOnTimedout (req, res, next) {
    if (req.timedout) {
        return
    }
  else{
      next()
    }
}



server.listen(port,function(){
    console.log("Servere is listening "+port)
})