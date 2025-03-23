import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [credentials ,setCredentials] = useState({email:"" , password:""})

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
             "Content-Type": "application/json",
            },
      body: JSON.stringify({email:credentials.email,password:credentials.password}),

           
          });
          const json = await response.json()
          console.log(json)

          if (json.success){
                //save the token and redirect
                localStorage.setItem('token',json.authToken)
                navigate('/');
          }
          else{
            alert("invalid credentials")
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="form-group my-2">
    <label htmlhtmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value = {credentials.email} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password' placeholder="Password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
