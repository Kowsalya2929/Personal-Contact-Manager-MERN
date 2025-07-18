import { create } from 'zustand'
import axiosInstance from '../api/axiosInstance.js'

const useContactStore = create((set)=>({
    contacts: [],
    setContacts: (contacts) => set({contacts}),
    getAllContact: async(search='')=>{
        try{
            const query = new URLSearchParams({search})
            const {data} = await axiosInstance.get(`/contact?${query}`)
            if(!data.success){
                return {success: false,message: data.message}
            }
            set({contacts: data.data})
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in get all contacts : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    },
    postContact: async(newContact)=>{
        try{
            const {data} = await axiosInstance.post('/contact',newContact)
            if(!data.success){
                return {success: false,message: data.message}
            }
            set((state)=>({contacts: [...state.contacts,data.data]}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in post contact : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    },
    patchContact: async(cid,updatedContact)=>{
        try{
            const {data} = await axiosInstance.patch(`/contact/${cid}`,updatedContact)
            if(!data.success){
                return {success: false,message: data.message}
            }
            set((state)=> ({contacts: state.contacts.map((c)=> c._id === cid ? data.data : c)}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in patch contact : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    },
    deleteContact: async(cid)=>{
        try{
            const {data} = await axiosInstance.delete(`/contact/${cid}`)
            if(!data.success){
                return {success: false,message: data.message}
            }
            set((state)=>({contacts: state.contacts.filter((c)=> c._id !== cid )}))
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in delete contact : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    }
}))

export default useContactStore;