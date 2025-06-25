const jwt = require("jsonwebtoken");
const auth = async (req, res, next)  => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({success:false, msg: "Authentication failed"});
    }


    //  Bearer token is the format used to send the token in the header

// Bearer dofibpdkneifpnb

const token = authHeader.split(" ") [1];
try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {userId: payload.userId, name: payload.name};
    next();
}
catch (error) {
     res.send(401).json({success: false, msg: "Authentication failed"});
}

} 



exports.module = auth;