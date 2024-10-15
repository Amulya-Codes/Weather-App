import userModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


// Configuring dotenv to load environment variables from the .env file
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// const SECRET_KEY = 'Register_api'; //will change it afterwards

const register = async (req, res) => {

    const { email, password, username } = req.body;

    //checking existing user . as it connects with db to find that user ,we need to make it await
 
try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(400).send("This email already exist");
    }

    // if user doesnt exist then we create a hashed password and create a user object to store it

    const hashPassword = await bcrypt.hash(password, 10);

        const user = {
            email,
            hashPassword,
            username
        }

       const result = await userModel.create(user);

       const token = jwt.sign({ email:result.email, id:result._id }, SECRET_KEY);

       return res.status(201).json({ user: result, token: token });
        
    } catch (error) {
     
        console.log("error while crating user ",error);
        return res.status(500).send("some error occured");
    }
}

module.exports = register;