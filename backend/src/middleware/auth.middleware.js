import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token provided" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Internal Server error in protected route", error);
        res.status(500).json({message: "Internal Server error"});
    }
}