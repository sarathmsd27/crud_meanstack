let express = require("express");
let cors = require("cors");
let mongoose =require("mongoose");
let bodyParser = require("body-parser");
let path = require("path");
let mongoDb = require("./database/db");

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected!!!")
},
  error=>{
    console.log("Database Connected"+error);
  }
);

//port

const employeeRoute =require("./routes/employee.routes")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(cors());
//create static path
app.use(express.static(path.join(__dirname,"dist/Employeedetails")));
//root
app.use("/api",employeeRoute);
//path
const port = process.env.port ||8000;
app.listen(port,()=>{
  console.log("Port listening to:"+port)
})

//error handler
app.use((req,res,next)=>{
  next(createError(404))
});
//base route
app.get("/",(res,req)=>{
  res.send("Invalid endpoint")
})
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"dist/EmployeeDetails/index.html"));
});
app.use(function(err,req,res,next){
  console.log(err.message);
  if(!err.statusCode)err.statusCode=500;
  res.status(err.statusCode).send(err.message)
});
