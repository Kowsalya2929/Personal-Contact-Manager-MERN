import { create } from 'zustand'
import axiosInstance from '../api/axiosInstance.js'

const useAuthStore = create((set)=>({
    auths: null,
    setAuths: (auths) => set({auths}),
    getUserName: async()=>{
        try{
            const {data} = await axiosInstance.get('/auth')
            if(!data.success){
                return {success: false,message: data.message}
            }
            set({auths: data.data})
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in getUsername : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    },
    postRegister: async(newUser)=>{
        try{
            const {data} = await axiosInstance.post('/auth/signUp',newUser)
            if(!data.success){
                return {success: false,message: data.message}
            }
            set({auths: data.data})
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in register : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    },
    postLogin: async(oldUser)=>{
        try{
            const {data} = await axiosInstance.post('/auth/signin',oldUser)
            if(!data.success){
                return {success: false,message: data.message}
            }
            const res = await axiosInstance.get('/auth')
            if(res.data.success){
                set({auths: res.data.data})
            }
            return {success: true,message: data.message}
        }catch(err){
            console.log(`Error in login : ${err.message}`)
            return {success: false,message: err.response?.data?.message || err.message}
        }
    }
}))

export default useAuthStore;