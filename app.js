const express= require("express");
const app=express();
const email = require('email-validator')

//first npm i mongoose to require mongoose in our project
const mongoose = require("mongoose")

//link of the database in mongoDB atlas
const db_link = "mongodb+srv://admin:pIL6o9gzz6LHjsYO@cluster0.dagemcj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log('err');
})

//schema
const userschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return email.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:function(){
            return email.validate(this.confirmPassword==this.password);
        }
    },
    role:{
        type:String,
        enum:['admin','user','delivery_boy'],
        default:'user'
    },
    profileImage:{
        type:String,
        //path of the default image in the public folder like below
        default:'public/img/default.jpg'
    }
});

//in schema we have to pass roles so that operations of admin are only performed by admin
//no one else can do it for security purpose
//we should not give this permission for this 
//to make sure that it should be done by admin we have to use middleware 
app.use(isAuthorised['admin']);
userRouter.route('')
    .get(getAllUsers)

//model
const userModel = mongoose.model('userModel',userschema);

// always make these function as async 
// (async function createUser(){
//     let user = {
//         name:'jasbir',
//         email:"abcd@gmail.com",
//         password:'12345678',
//         confirmPassword:'12345678'
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();

//read operation in mongoose from database
async function getUsers(res,res){

    //to get all values in db
    let allUsers = await userModel.find();

    //to find one query
    // let allUsers = await userModel.findOne({name:'abhishek'})

    res.json({
        message:'list of all users',
        data:allUsers,
    });
}

//create operation
async function postSignUp(req,res){
    let dataObj=req.body;
    let user = await userModel.create(dataObj);
    res.json({
        message:"user signed up",
        data:user,
    });
}

//update operation
async function updateUser(res,res){
    let dataToBeUpdated = req.body;
    let user =await userModel.findOneAndUpdate({email:'abc@gmail.com'},dataToBeUpdated);
    res.json({
        message:"data updated successfully"
    });
}

//delete operation
async function deleteUser(req,res){
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:'user deleted successfully',
        data:user,
    });
}


//two types of hooks pre and post 
//pre hook is for doing any work before any CRUD operation and vice versa is for post
//for example before signup we have to check whther the password and confirmPassword matches or not
userschema.pre('save',function(){
    console.log()
})
userschema.post('save',function(doc){
    //this doc includes the object made by operation
    console.log(doc)
})


//we dont have to save the confirmPassword in database so we have to remove from the object 
//0we can to do this by pre hooks
userschema.pre('save',function(){
    //by this it will not store this value into the database
    this.confirmPassword=undefined;
})

