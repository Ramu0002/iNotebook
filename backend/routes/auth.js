const express = require('express')
const User  = require('../models/user')
const router = express.Router();
const {body , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET  = 'shhhhh'

//ROUTE 1 : create user using POST : /api/auth/createuser 
router.post('/createUser' ,[
    body('name' , 'Enter a valid name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
], async (req,res) => {

  //if there are errors return bad req and errors
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array()});
  }
try {
  

  //check whether the user with this email already
  let user =await User.findOne({email : req.body.email})
  if (user){
    return res.status(400).json({error : "Sorry user with this email already exist"})
  }

  //adding salt to password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(req.body.password , salt);

  user  = await User.create({
    name : req.body.name,
    email :  req.body.email,
    password : secPassword
  })
  // .then(user => res.json(user)).
  // catch(err => {console.log(err)
  //   res.json({error : 'Please enter unique value'})
  // })

  const data = {
    user : {
      id:user.id 
  }
}
  const authToken = jwt.sign(data, JWT_SECRET);

  res.json({authToken})
} catch (error) {
  console.error(error.message)
  res.status(500).send('internal server error');

}

   
    
})

//ROUTE 2: authenticate user using POST : /api/auth/login 
router.post('/login' ,[
  
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists()

], async (req,res) => {

  //if there are errors return bad req and errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({errors : errors.array()});
}
const {email,password} = req.body;
try {
  let user  = await User.findOne({email})
  if (!user){
    return res.status(400).json({error : 'Wrong email/password'})
  }
  const passwordcompare  = await bcrypt.compare(password , user.password);
  if(!passwordcompare){
    return res.status(400).json({error : 'Wrong email/password'})
  }
  const data = {
    user : {
      id:user.id 
  }
}
  const authToken = jwt.sign(data, JWT_SECRET);

  res.json({authToken})
} catch (error) {
  console.error(error.message)
  res.status(500).send('internal server error');
}
});

//ROUTE 3: Get loggedIn user details using POST : /api/auth/getuser
router.post('/getuser', fetchUser , async (req,res) => {

try {
  userId  = req.user.id
  const user  = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message)
  res.status(500).send('internal server error');

}
});

module.exports = router