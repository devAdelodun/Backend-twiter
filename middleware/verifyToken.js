import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        throw new Error("You are not authenticated")
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            throw new Error("Invalid token")
        };
        req.user = user;
        next();
    });

}