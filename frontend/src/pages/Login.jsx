import React, { useState } from 'react'
import '../assets/css/login.css'
import {Link, useNavigate} from 'react-router-dom'
import useAuthStore from '../store/auth.js'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {

  const {postLogin} = useAuthStore()

  const [oldUser,setOldUser] = useState({email:"",password:""})

  const navigate = useNavigate()

  const handleSignIn = async(oldUser)=>{
    const {success,message} = await postLogin(oldUser)
    if(!success){
      toast.error(message,{
        position: 'top-center',
        pauseOnHover: true,
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1000,
        draggable: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        pauseOnHover: true,
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false
      })
      setTimeout(() => {
        navigate('/')
      }, 1000);
      setOldUser({email:"",password:""})
    }
  }

  
  return (
    <div className='d-flex user-select-none justify-content-center align-items-center vh-100 w-100 bg-dark-subtle'>
      <ToastContainer />
      <form className='card border rounded-4 shadow-lg bg-primary p-3 gap-3 mx-3 mx-md-5'>

        <h4 className='text-center my-2 text-white'>Welcome Back to Login</h4>

        <div className='form-floating'>
          <input type="email" id='em' placeholder='Email' className='form-control' value={oldUser?.email} onChange={(e)=>setOldUser({...oldUser,email: e.target.value})} />
          <label htmlFor="em">Email Address</label>
        </div>

        <div className='form-floating'>
          <input type="password" id='pass' placeholder='Password' className='form-control' value={oldUser?.password} onChange={(e)=>setOldUser({...oldUser,password: e.target.value})} />
          <label htmlFor="pass">Create Password</label>
        </div>

        <button className='btn btn-light w-50 mx-auto' type='button' onClick={()=>handleSignIn(oldUser)}>SignIn</button>

        <Link to='/register' className='text-decoration-none text-white text-center'>Don't have an account? New Account</Link>

      </form>
    </div>
  )
}

export default Login