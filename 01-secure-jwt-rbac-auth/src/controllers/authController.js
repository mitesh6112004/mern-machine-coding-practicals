import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { hashToken, generateToken, verifyRefreshToken, cookieOptions } from "../utils/tokenUtils.js";

export const registerUser = async(req,res) => {
    try {
         const { name, email, password } = req.body;

         if (
           typeof name !== "string" ||
           typeof email !== "string" ||
           typeof password !== "string"
         ) {
           return res.status(400).json({
             success: false,
             message: "Invalid input format",
           });
         }

         if (!name.trim() || !email.trim() || password.trim().length < 6) {
           return res.status(400).json({
             success: false,
             message: "all input fields are required, password at least 6 characters",
           });
         }

        const normalizedEmail = email.trim().toLowerCase();

         const existingUser = await User.findOne({
           email : normalizedEmail,
         });

         if (existingUser) {
           return res.status(409).json({
             success: false,
             message: "User Already exist",
           });
         }

      
         const passwordHash = await bcrypt.hash(password,12);

         const user = await User.create({
           name : name.trim(),
           email: normalizedEmail,
           passwordHash,
           role: "user",
         });

         const { accessToken, refreshToken } = generateToken(user);

         user.refreshTokenHash = hashToken(refreshToken);
         await user.save();

         res.cookie("refreshToken", refreshToken, cookieOptions);

         res.status(201).json({
            success : true, 
            message : "User registered successfully",
            accessToken,
            data : {
                id : user._id,
                name : user.name,
                email: user.email,
                role : user.role
            }
         })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Server error"
        })
    }

   
}

export const loginUser = async (req,res) => {

  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success : false, 
        message: "Invalid input format"
      })
    }

    if(!email.trim() || password.trim().length < 6) {
        return res.status(400).json({
          success : false, 
          message : "all input fields are required, password at least 6 characters"
        })
    } 

    const user = await User.findOne({email : email.trim().toLowerCase()}).select("+passwordHash");

    if(!user){
      return res.status(401).json({
        success: false,
        message : "Invalid Credentials"
      })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if(!isMatch) {
      return res.status(401).json({
        success: false, 
        message: "Invalid Credentials"
      })
    }

    user.tokenVersion +=1; 
    const { accessToken, refreshToken } = generateToken(user);

    user.refreshTokenHash = hashToken(refreshToken);
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      success : true, 
      message : "Login successfully",
      accessToken,
      data : {
        id : user._id,
        name : user.name,
        email: user.email,
        role : user.role
      }
    })

  } catch (error) {
    return res.status(500).json({
      success : false, 
      message : "Server error"
    })
  }

  

}