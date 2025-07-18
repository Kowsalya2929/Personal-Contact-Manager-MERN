import React from 'react'
import {Link} from 'react-router-dom'
import navbarlogo1 from '../assets/images/navbar/navbar-logo1.png'
import navbarlogo2 from '../assets/images/navbar/navbar-logo2.png' 

const Navbar = () => {
  return (
    <>
    <nav className='navbar bg-primary p-0 position-sticky top-0 z-3' style={{boxShadow:'2px 2px 5px black'}}>
        <ul className='navbar-nav d-flex flex-row w-100 justify-content-between align-items-center'>
            <li className='nav-item'>
                <img src={navbarlogo1} alt="navbar-logo1" height={80} width={80}  />
            </li>
            <div className='d-flex flex-column my-2 flex-lg-row gap-2 gap-lg-5 align-items-center'>
                <li className='nav-item text-center'>
                    <Link to={'/'} className='nav-link fs-4 fw-blod text-white'>Personal Contact Manager</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/login' className='nav-link bg-light px-5 py-2 rounded'>Login</Link>
                </li>
            </div>
            <li className='navbar-nav'>
                <img src={navbarlogo2} alt="navbar-logo2" height={80} width={80} />
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar