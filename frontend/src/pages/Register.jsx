import React, { useState } from 'react'
import '../assets/css/login.css'
import {Link, useNavigate} from 'react-router-dom'
import useAuthStore from '../store/auth.js'
import { toast, ToastContainer } from 'react-toastify'

const Register = () => {

  const {postRegister} = useAuthStore()

  const [newUser,setNewUser] = useState({uname:"",email:"",password:""})

  const navigate = useNavigate()

  const handleRegister = async(newUser)=>{
    const {success,message} = await postRegister(newUser);
    if(!success){
      toast.error(message,{
        position: 'top-center',
        pauseOnHover: true,
        hideProgressBar: false,
        autoClose: 1000,
        closeOnClick: true,
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
      setNewUser({uname:"",email:"",password:""})
    }
  }

  return (
    <div className='d-flex user-select-none justify-content-center align-items-center vh-100 w-100 bg-dark-subtle'>
      <ToastContainer />
      <form className='card rounded-4 shadow bg-primary p-3 gap-3 mx-3 mx-md-5'>

        <h4 className='text-center my-2 text-white '>Welcome to Register</h4>

        <div className='form-floating'>
          <input type="text" id='un' placeholder='Username' className='form-control' value={newUser?.uname} onChange={(e)=>setNewUser({...newUser,uname: e.target.value})} />
          <label htmlFor="un">Username</label>
        </div>

        <div className='form-floating'>
          <input type="email" id='em' placeholder='Email' className='form-control' value={newUser?.email} onChange={(e)=>setNewUser({...newUser,email: e.target.value})} />
          <label htmlFor="em">Email Address</label>
        </div>

        <div className='form-floating'>
          <input type="password" id='pass' placeholder='Password' className='form-control' value={newUser?.password} onChange={(e)=>setNewUser({...newUser,password: e.target.value})} />
          <label htmlFor="pass">Create Password</label>
        </div>

        <button className='btn btn-light w-50 mx-auto' type='button' onClick={()=>handleRegister(newUser)}>SignUp</button>

        <Link to='/login' className='text-decoration-none text-white text-center'>Already have an account? Login</Link>

      </form>
    </div>
  )
}

export default Register