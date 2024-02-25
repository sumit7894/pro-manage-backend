const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const ServiceError = require('../Errors/service-error');
const { StatusCodes } = require('http-status-codes');
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }   
    
    async create(data){
        try {
            const existingUser = await this.userRepository.get(data.email);
            if(existingUser){
                throw new ServiceError('User already exist','Somthing went wrong in user creation',StatusCodes.CONFLICT);
            }
            const user = await this.userRepository.create(data);
            const token = await this.createToken(data.email,data.name);
            return {"name": user.name,"token":token};
        } catch (error) {
            console.log("Somthing went wrong in the service layer",error);
            throw error;
        }
    }
    async createToken(user){
        try {
            const token = jwt.sign(user,JWT_KEY);
            return token;
        } catch (error) {
            console.log("Somthing went wrong in service layer in creating token");
            throw error;
        }
    }
    async get(email){
        try {
            const user = await this.userRepository.get(email);
            if(!user){
                throw new ServiceError('User not found','Somthing went wrong in user creation',StatusCodes.UNAUTHORIZED);
            }
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the service layer");
            throw error;
        }
    }
    async comparePassword(password,hashedPassword){
        try {
            return bcrypt.compareSync(password,hashedPassword);
        } catch (error) {
            console.log("Somthing went wrong in matching the password");
        }
    }
    async login(data){
        try{
        const user = await this.get(data.email);
        if(!user){
            throw new ServiceError("No user exist with this email","Error in signin")
        }
        const matchPassword = await this.comparePassword(data.password,user.password);
        if(!matchPassword){
            throw new ServiceError("Wrong Password","Password doesn't match",StatusCodes.UNAUTHORIZED)
        }
        const token = await this.createToken(data.email,user.name);
        return {"name":user.name,"token":token,"id":user._id};
        }catch(error){
            console.log("Somthing went wrong in service layer",error);
            throw error;
        }
    }
    async update(data){
        try {
            const user = await this.get(data.email);
            if(!user){
                throw new ServiceError("No user exist with this email","Error in signin")
            }
            const matchPassword = await this.comparePassword(data.oldPassword,user.password);
            if(!matchPassword){
                throw new ServiceError("Wrong Password","Password doesn't match",StatusCodes.UNAUTHORIZED)
            }
            const updatedUser = await this.userRepository.update(data);
            return updatedUser;
        } catch (error) {
            console.log("Somthing went wrong in service layer",error);
            throw error;
        }
    }
}
module.exports = UserService;