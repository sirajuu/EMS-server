const users = require("../models/useSchema");

// register logic

exports.userRegister = async (req,res)=>{

    // to get image url
   const file  =req.file.filename
   const {fname,lname,mobile,email,gender,location,status}=req.body
   if(!fname || !lname || !mobile || !gender || !location || !status || !file){
    res.status(403).json("All inputs are required")
   }
   try{

    const preuser = await users.findOne({email})
    if(preuser){
        req.status(403).json("The user already exist in our database")
    }
    else{
        const newuser = new users({
            fname,
            lname,
            email,
            mobile,
            gender,
            status,
            profile:file,
            location
        })
        await newuser.save()
        res.status(200).json(newuser)
    }

   }
   catch(error){
    res.status(401).json(error)
   }
}

// get all users
exports.getallusers = async (req,res)=>{
     // get query parameter from req
     const search = req.query.search
     const query = {
        fname:{$regex:search,$options:"i"}
     }
    try{
        const userdata = await users.find(query)
        res.status(200).json(userdata)
    }
    catch(error){
        res.status(401).json(error)
    }
}

// get a user
exports.getuserdetail = async (req,res)=>{
   

    const {id} = req.params
    try{
        const userdata = await users.findOne({_id:id})
        if(userdata){
            res.status(200).json(userdata)
        }
        else{
            req.status(404).json("User doesnot exist!!")
        }
       
    }
    catch(error){
        res.status(401).json(error)
    }
}

// editUser
exports.editUser=async(req,res)=>{
    const{id}=req.params
    const {fname,lname,mobile,email,gender,location,status,user_profile}=req.body
        // to get image url
   const file  = req.file? req.file.filename:user_profile

   try{
    const updateUser = await users.findByIdAndUpdate({_id:id},{
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        profile: file,
        location
    },{
        new:true
    })
    await updateUser.save()
    res.status(200).json(updateUser)
   }
   catch(error){
    res.status(402).json(error)
    console.log(error);
   }
}


// deleteUser
exports.deleteUser = async (req,res)=>{
    const{id}=req.params
    try{
        const removeUser = await users.findByIdAndDelete({_id:id})
        await removeUser.save()
        res.status(200).json(removeUser)
       }
       catch(error){
        res.status(401).json(error)
        console.log(error);
       }
}


// multer - uploading file in node js  ,Multer adds a body object and a file or files object to the request object
