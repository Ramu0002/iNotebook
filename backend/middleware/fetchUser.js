const jwt = require('jsonwebtoken')
const JWT_SECRET  = 'shhhhh'


const fetchUser = (req,res,next) =>{
//Get user details from jwt token and add id to req object

const token  = req.header('auth-token');
if (!token){
    res.status(401).send({error : 'Please authenticate using valid token'})
}
try {
    const data = jwt.verify(token , JWT_SECRET)
req.user = data.user ;

next();
} catch (error) {
    res.status(401).send({error : 'Please authenticate using valid token'})
    
}



}

module.exports = fetchUser;