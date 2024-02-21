const UserService = require('../services/user-service');
const {StatusCodes} = require('http-status-codes')
const userService = new UserService();

const register = async (req,res)=>{
    try{
    const response = await userService.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    return res.status(StatusCodes.OK).json({
        success:true,
        message:"Successfully created the user",
        data:response,
        err:{}
    })
}   catch(error){
    return res.status(error.statusCode).json({
        success:false,
        message:error.message,
        data:{},
        err:error.explanation,
        status:error.status
    })}
}
const login = async (req,res) =>{
    try {
        const response = await userService.login({
            email: req.body.email,
            password:req.body.password
        })
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Successfully Logged In",
            data:response,
            err:{}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            err:error.explanation
        })
    }
}
const update = async (req,res) =>{
    try {
        const response = await userService.update({
            name:req.body.name,
            email:req.body.email,
            oldPassword:req.body.oldPassword,
            newPassword:req.body.newPassword
        })
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"User updated successfully",
            data:response,
            err:{}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            err:error.explanation
        })
    }
}
module.exports ={
    register,
    login,
    update
}