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
    req.status(401).json(error)
   }
}


// multer - uploading file in node js  ,Multer adds a body object and a file or files object to the request object