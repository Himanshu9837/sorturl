const User = require("../models/urluserSchema");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Users {
    /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns  store users Data
     */
  
    async register(req, res) {
      console.log(req.body);
      const {name,email,password,} = req.body; //getting data by object destructuring
      try {
        const userExist = await User.findOne({ email: email }); //this connects email from userschema.js to this email from auth.js
  
        if (userExist) {
          return res.status(422).json({ error: "email already exists" });
        } else {
        
          const user = new User({name,email,password, }); 
          await user.save().then((result)=>{
            res.status(200).json({ message: "user registetred sucessfully" });
          }) //saving data in user constant

        }
      } catch (error) {
        console.log(error);
      }
    }
    async login(req, res) {
        console.log(req.body);
    
        try { 
          const { email, password } = req.body; //getting email password by object destructring
    
          if (!email || !password) {
            return res.status(400).json({ error: "plz fill the data" });
          }
          const userLogin = await User.findOne({email:email});
         console.log(userLogin);
    
          if (userLogin) {
    
            const isMatch = await bcrypt.compare(password, userLogin.password); //comparing hashed password with login passwords
            const tokenData = {};
            tokenData.name = userLogin.name;
            tokenData.email = userLogin.email;
            tokenData.id = userLogin._id;
    
            const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
              expiresIn: "2h",
            });
          
            console.log(`the token is :- ${token}`);
    
            if (!isMatch) {
              res.status(400).json({ error: "Invalid Credentials " }); //dono me invalid credential he dena hai taaki hacker ko pata na chale
            } else {
              res.json({
                message: "user signin sucessfully",
                tokenData: tokenData,
                accesstoken: token
              });
            }
         
          } else {
            res.status(400).json({ error: "Invalid Credentials" }); //dono me invalid credential he dena hai
          }
        } catch (error) {
          console.log(error);
        }
      }
}
module.exports = new Users();