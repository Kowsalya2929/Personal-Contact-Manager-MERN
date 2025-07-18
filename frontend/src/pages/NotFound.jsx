import React from 'react'
import { Link } from 'react-router-dom'
import notfoundlogo from '../assets/images/notfound/notfound-logo.png'


const NotFound = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100 w-100 bg-danger'>
        <div className='card' style={{width:'18rem'}}>
            <div className="card-body text-center">
                <img src={notfoundlogo} alt="notfound-logo" height={200} width={200} />
                <h2 className='card-subtitle my-3'>Page not found</h2>
                <p className='card-text my-3'>Please you go to <Link to='/' className='card-link btn btn-primary'>Home</Link></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default NotFound