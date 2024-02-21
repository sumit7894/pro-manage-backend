const User = require('../models/user');
const bcrypt = require('bcrypt');
const {SALT} = require('../config/serverConfig');
class UserRepository{
    async create(data){
        try {
            const {password} = data;
            const encryptedPassword = bcrypt.hashSync(password,SALT);
            data.password = encryptedPassword;
            const user= await User.create(data);
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repo layer");
            throw error;
        }
    }
    async get(emailId){
        try {
            const user = await User.findOne({email:emailId});
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repo layer");
            throw error;
        }
    }
    async update(data)
    {
        try {
            const {name,email,newPassword} = data;
            const encryptedPassword = bcrypt.hashSync(newPassword,SALT);
            const user = await User.findOneAndUpdate({email},{name:name,password:encryptedPassword},{new:true});
            return user;
        } catch (error) {
            console.log("Somthing went wrong in the repository layer",error);
            throw error;
        }
    }
}
module.exports = UserRepository;