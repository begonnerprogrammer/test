"use client"
import React, { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [subject,setSubject]=useState("");
const [massage,setMassage]=useState("");

  const submit=async(e)=>{
    e.preventDefault();
    const res=await fetch('http://localhost:4000/contact',{
  
      //rrules to write
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,massage,subject,
      })
    })
   
    const data=await res.json();
   
    if(data.status===422 || !data){
      console.log("Invalid")
    }
    else {
      console.log("Valid")
      alert("Thank You! Form Submitted")
    }
  }


  return (
    <div className='main h-[100%] flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-18 justify-evenly mx-auto items-center snap-center'>

      <h3 className='absolute top-8 uppercase tracking-[20px] text-blue-500  md:text-xl '>Contact</h3>
      <div className='flex flex-col space-y-2 mt-20'>
        <h4 className=' md:text-xl font-semibold text-center'>
          I have got just what you need.  {""}
          <span className='underline'>Lets Talk.</span>
        </h4>
        <div className='space-y-3 '>
        <div className='flex items-center space-x-5 space-y-2 justify-center'>
        <FaPhoneAlt  className='icon md:h-4 md:w-4 nimate-pulse text-blue-500'/>
        <p className='icontext text-xl'>Phone.</p>
          </div>
          <div className='flex items-center space-x-5 space-y-2 justify-center'>
        <FaRegEnvelope  className='icon md:h-4 md:w-4 text-blue-500 '/>
        <p className='icontext text-xl'>Email.</p>
          </div>
          <div className='flex items-center space-x-5 space-y-2 justify-center'>
        <CiLocationOn  className='icon md:h-6 md:w-6 text-blue-500'/>
        <p className='icontext text-xl'>Address.</p>
          </div>
        </div>
      
 
    <form className='flex flex-col space-y-2 max-w-[500px]  md:bg-gray-400' onSubmit={submit} method='POST' >
      <div  className='md:flex md:space-x-2'>
        <input value={  name }   onChange={(e)=>setName(e.target.value)} placeholder='Name'  className="placeholder:italic placeholder:text-black contactinput" type="text" required />
      <input value={email}  onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' type="email" className="placeholder:italic placeholder:text-black contactinput"   required/> 
        
      </div>
      <input value={subject} onChange={(e)=>setSubject(e.target.value)}  placeholder='Subject'  className="placeholder:italic placeholder:text-black contactinput" type="text"  required/>
      <textarea  value={massage} onChange={(e)=>setMassage(e.target.value)}  placeholder='Massage'  className="placeholder:italic placeholder:text-black contactinput" name="" id="" cols="10" rows="2" required></textarea>
      <button className='bg-blue-500 hover:bg-blue-300 py-2 px-10 rounded-md text-black font-bold md:text-lg'>Submit</button>
    </form>
 
      </div>
    
     
    </div>
     
  )
}

export default Contact

