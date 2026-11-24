import User from "../models/User.js";
import { verifyAccessToken } from "../utils/tokenUtils.js";

export const verifyAuth = async (req,res,next) => {

    try {
         const authHeader = req.headers?.authorization;

         if (!authHeader || !authHeader.startsWith("Bearer ")) {
           return res.status(401).json({
             success: false,
             message: "Unathorized: Access token missing",
           });
         }

         const token = authHeader.split(" ")[1];
         const decoded = verifyAccessToken(token);

         const user = await User.findById(decoded.id).select("name email tokenVersion role");

         if(!user || user.tokenVersion !== decoded.tokenVersion) {
            return res.status(401).json({
                success : false,
                message : "Session is expired or revoked, Please login again"
            })
         }

         req.user = user;
         next();
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Unauthorized : Invalid or expired Access Token"
        })
    }

   
}