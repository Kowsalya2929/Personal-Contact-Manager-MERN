import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx';
import ContactList from './ContactList.jsx';
import '../assets/css/home.css'
import useAuthStore from '../store/auth.js';
import useContactStore from '../store/contact.js';
import { toast, ToastContainer } from 'react-toastify'

const Home = () => {

  const {getUserName} = useAuthStore()

  const {postContact,getAllContact} = useContactStore()

  const [username,setUsername] = useState("Guest")

  const [newContact,setNewContact] = useState({cname:"",cimg:"",cphone:""})

  const [search,setSearch] = useState('')

  const fetchUsername = async()=>{
    await getUserName();
    const authStore = useAuthStore.getState()
    setUsername(authStore.auths?.uname || "Guest")
  }

  useEffect(()=>{
    fetchUsername()
    getAllContact(search)
  },[getAllContact,search])

  const handleAddContact = async(newContact)=>{
    const {success,message} = await postContact(newContact)
    if(!success){
      toast.error(message,{
        position: 'top-center',
        pauseOnHover: true,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        autoClose: 1000
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        pauseOnHover: true,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        autoClose: 1000
      })
      setNewContact({cname:"",cimg:"",cphone:""})
    }
  }

  return (
    <>

    {/* navbar */}

    <Navbar />

    <ToastContainer />

    <div className='container-md my-5'>

        {/* welcome msg with search */}

        <div className='d-flex flex-lg-row flex-column gap-3 gap-lg-0 align-items-center justify-content-evenly'>
            <h4 className='text-center'>Hi {username}, Yours Contact List 📄</h4>
            <input type="search" placeholder='🔍Search name and number...' className='form-control ser' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <button className='btn btn-primary fs-4 rounded-circle' data-bs-target="#modaladd" data-bs-toggle="modal"><i className="bi bi-plus-lg"></i></button>
        </div>

        {/* add contact modal */}

        <div className='modal fade' id='modaladd' data-bs-backdrop='static'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className='text-center'>Add New Contact</h5>
              </div>
              <div className="modal-body">

                <div className="form-floating">
                  <input type="text" id='cn' placeholder='Contact Name' className='form-control' value={newContact?.cname} onChange={(e)=>setNewContact({...newContact,cname: e.target.value})} />
                  <label htmlFor="cn">Name</label>
                </div>

                <div className="form-floating mt-2">
                  <input type="text" id='num' placeholder='Contact Number' className='form-control' value={newContact?.cphone} onChange={(e)=>setNewContact({...newContact,cphone: e.target.value})} />
                  <label htmlFor="num">Phone Number</label>
                </div>

                <div className="form-floating mt-2">
                  <input type="text" id='img' placeholder='Contact Image' className='form-control' value={newContact?.cimg} onChange={(e)=>setNewContact({...newContact,cimg: e.target.value})} />
                  <label htmlFor="img">Image URL</label>
                </div>

              </div>
              <div className="modal-footer">
                <button className='btn btn-primary' type='button' onClick={()=>handleAddContact(newContact)} >Add Contact</button>
                <button className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
              </div>
            </div>
          </div>
        </div>

        {/* contact list */}

        <ContactList />

    </div>
    </>
  )
}

export default Home