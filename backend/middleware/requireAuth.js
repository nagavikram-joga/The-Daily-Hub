import jwt from 'jsonwebtoken';
const requireAuth = async (req, res, next) => {
    //console.log(req.headers)
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({message:'Unauthorized'});
    }
    // console.log(authorization);
    const token = authorization.split(' ')[1]+"";
    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        console.log("auth successful in requireAuth");

        next();
    } catch (error) {
        console.log("error in requireAuth: " + JSON.stringify(error));
        return res.status(500).json({message:error.message});
    }
}
export default requireAuth;
