import React, { useEffect, useState } from 'react'
import userlogo from '../assets/images/contactlist/user-logo.png'
import '../assets/css/contactlist.css'
import useContactStore from '../store/contact.js'
import { toast, ToastContainer } from 'react-toastify'

const ContactList = () => {

  const {contacts,getAllContact,patchContact,deleteContact} = useContactStore()

  const [selectedContact,setSelectedContact] = useState(null)

  const [updatedContact,setUpdatedContact] = useState({cname:"",cimg:"",cphone:""})


  const handleEdit = (c) =>{
    setSelectedContact(c);
    setUpdatedContact({cname: c.cname,cimg: c.cimg,cphone: c.cphone})
  }


  const handleEditContact= async(cid,updatedContact)=>{
    const {success,message} = await patchContact(cid,updatedContact)
    if(!success){
      toast.error(message,{
        position: 'top-center',
        pauseOnHover: true,
        closeOnClick: true,
        hideProgressBar: false,
        autoClose: 1000,
        draggable: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        pauseOnHover: true,
        closeOnClick: true,
        hideProgressBar: false,
        autoClose: 1000,
        draggable: true
      })
    }
  }

  const handleDeleteContact = async(cid)=>{
    const {success,message} = await deleteContact(cid)
    if(!success){
      toast.error(message,{
        position: 'top-center',
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        autoClose: 1000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true
      })
    }
  }

  useEffect(()=>{
    getAllContact()
  },[getAllContact])


  return (
    <div className='d-flex justify-content-center'>
    <ToastContainer />
    <div className='mt-5 bg-primary-subtle border rounded-3 p-3 bglist '>

        <div className="card d-flex">

          {contacts.map((c)=>(
          
          <div className='card-body rounded edde1' key={c._id}>

            {/* contact name with img */}

            <div className='d-flex flex-column flex-md-row align-items-center gap-2 gap-md-0 justify-content-center justify-content-md-start'>
              <img src={c?.cimg || userlogo} alt="userlogo" className='border rounded-circle bg-light' height={50} width={50} />
              <div className='d-flex gap-0 gap-md-2 flex-column offset-1 mt-0 mt-md-2'>
                <h5 className='text-capitalize'>{c?.cname}</h5>
                <h6 className='text-secondary'>{c?.cphone}</h6>
              </div>
            </div>

            {/* edit and delete contact */}

            <div className='d-flex justify-content-center justify-content-md-end edde' data-bs-toggle='dropdown'>
              <i className="bi bi-three-dots" style={{cursor:'pointer'}}></i>
              <ul className='dropdown-menu text-center text-capitalize position-absolute end-0'>
                <li className='dropdown-item' style={{cursor:'pointer'}} data-bs-target="#modaledit" data-bs-toggle="modal" onClick={()=>handleEdit(c)}>Edit</li>
                <li className='dropdown-item text-danger' style={{cursor:'pointer'}} type='button' onClick={()=>handleDeleteContact(c._id)}>Delete</li>
              </ul>
            </div>

          </div>  
          ))}     


          {/* edit contact modal */}

                <div className='modal fade' id='modaledit' data-bs-backdrop='static'>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5>Edit contact</h5>
                      </div>
                      <div className="modal-body">
                        
                        <div className="form-floating">
                          <input type="text" id='cn' placeholder='Contact Name' className='form-control' value={updatedContact?.cname} onChange={(e)=>setUpdatedContact({...updatedContact,cname: e.target.value})} />
                          <label htmlFor="cn">Name</label>
                        </div>

                        <div className="form-floating mt-2">
                          <input type="text" id='num' placeholder='Contact Number' className='form-control' value={updatedContact?.cphone} onChange={(e)=>setUpdatedContact({...updatedContact,cphone: e.target.value})} />
                          <label htmlFor="num">Phone Number</label>
                        </div>

                        <div className="form-floating mt-2">
                          <input type="text" id='img' placeholder='Contact Image' className='form-control' value={updatedContact?.cimg} onChange={(e)=>setUpdatedContact({...updatedContact,cimg: e.target.value})} />
                          <label htmlFor="img">Image URL</label>
                        </div>

                      </div>
                      <div className="modal-footer">
                        <button className='btn btn-primary' type='button' onClick={()=>handleEditContact(selectedContact._id,updatedContact)}>Edit Contact</button>
                        <button className='btn btn-secondary' data-bs-dismiss='modal'>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>

          {contacts.length === 0 && (
            <div className='text-center my-4'>
              No contact available
            </div> 
          )}  

        </div>

    </div>
    </div>
  )
}

export default ContactList