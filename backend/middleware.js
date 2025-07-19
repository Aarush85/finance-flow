const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(402).json({msg: "User not authorized"});

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, "secret");

        if(decoded){
            req.userId = decoded.userId;
            next();
        }
    }
    catch(err){
        res.status(400).json({msg: "User not authorized"});
    }
}

module.exports = {authMiddleware};