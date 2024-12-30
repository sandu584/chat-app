import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token,{
        maxAge: 7*24*60*60*1000, // have to give value in ms
        httpOnly: true, // prevents XSS attack
        sameSite: "strict", // prevents CSRF attack
        secure: process.env.NODE_ENV !== "development" // chekcs whether conn is http/https on production
    })

    return token;
};