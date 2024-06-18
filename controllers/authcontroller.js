import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from "jsonwebtoken";
export const registerController = async(req,res) =>{
  try{
    const {name,email,password,phone,address}=req.body
    //validations
    if(!name){
        return res.send({message : 'name is required'});
    }
    if(!email){
        return res.send({message  : 'email is required'});
    }
    if(!password){
        return res.send({message  : 'password is required'});
    }
    if(!phone){
        return res.send({message  : 'phone no is required'});
    }
    if(!address){
        return res.send({message : 'address is required'});
    }
    //checkuser
    const existinguser= await userModel.findOne({email});
        //exisitinguser
        if(existinguser){
            return res.status(200).send(
                {
                    success:false,
                    message : 'Already register please login',
                }
            )
        }
        //registeruser;
        const hashedPassword= await hashPassword(password);
        //save
        const user= await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword
        }).save();
        res.status(201).send({
            success:true,
            message: 'user registered successfully',
            user,
        })
  }catch(error){
    console.log(error);
    res.status(500).send(
        {
            success:false,
            message : 'error in registration',
            error,
        }
    )
  }
};
export const loginController =async(req,res) =>{
    try{
       const {email,password}=req.body;
       //validations
       if(!email || !password){
         return res.status(404).send({
            success:false,
            message: "invalid email or password",
         })
       }
       const user =await userModel.findOne({email});
       if(!user){
          return res.status(404).send({
            success:false,
            message:"email not registered",
          })
       }
       const match= await comparePassword(password,user.password);
       if(!match){
          return res.status(200).send({
            success: false,
            message:"wrong password",
          })
       }
       //token
       const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d",
       });
       res.status(201).send({
        success:true,
        message:"login successfully",
        user:{
           name: user.name,
           email:user.email,
           address: user.address,
           phone: user.phone,
        },
        token,
       })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error in login",
            error,
        })
    }
}
export const testController= (req,res)=>{
    res.send("protected route")
}