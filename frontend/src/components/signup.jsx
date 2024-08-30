import React, { useState } from 'react'

import { json } from 'react-router-dom';
import { useNavigate} from'react-router-dom';

function Signup(props) {
  const Host= "http://localhost:5000/"
  let history = useNavigate();

  const onChange = (e) => {
    setcradensital({...cradensital,[e.target.name]: e.target.value });
    }
  const [cradensital,setcradensital] = useState({email:"",password:"",cpassword:"",name:""});
   const handlesumit = async(e) => {
    e.preventDefault();
    // props.login(e.target.email.value,e.target.password.value)
  
    // const response = await fetch(`${Host}/api/auth/createuser`, {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:cradensital.name,email:cradensital.email,password:cradensital.password}), 
    });
    // props.setProgress(10)

    const json = await response.json();
    // props.setProgress(30)

    console.log(json);
    if (json.success) {
      localStorage.setItem('token',json.authtoken);
      // props.setProgress(60)

      history("/login");
      // props.setProgress(100)

      props.showalert("successfuly crerate account","success")
  }else{
    // alert(json.message) 
    props.showalert("email already in use","danger");
    history("/Signup")
  }
}
  return (
    <form onSubmit={handlesumit}>

    <div>
         <div className='items-center justify-center'>
      <h1 className='text-4xl font-extralight text-center text-blue-400 mb-10 '>Sign-up</h1>
      <div className='flex flex-col rounded-md  gap-4 border-2 border-sky-300 rounded-x1 w-[600px] p-4 mx-auto'>
      <div className='my-1w-15'>
            <label htmlFor="" className='text-xl rounded-md  mr-10 my-2  text-gray-400'>Name</label>
            <input type='text'  name='name' value={cradensital.name} onChange={onChange} id="name" className='border-2 rounded-md  border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <div className='my-0 rounded-md '>
            <label  htmlFor="" className='text-xl mr-10 my-2  text-gray-400'>gmail</label>
            <input type='email' onChange={onChange} value={cradensital.email} name='email' id="email1" aria-describedby="emailHelp" className='border-2 rounded-md  border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <div className='my-0'>
            <label className='text-xl mr-10 my-2 rounded-md  text-gray-400' htmlFor=""> conform password</label>
            <input type='password'  name='password'  value={cradensital.password} placeholder="6 letter must contain" onChange={onChange}id="Password" className='border-2 rounded-md  border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <div className='my-0'>
            <label htmlFor="exampleInputPassword1" className='text-xl mr-10 rounded-md   text-gray-400'>password</label>
            <input type='text'  name='cpassword' value={cradensital.cpassword} onChange={onChange} id="cPassword" className='border-2 rounded-md  border-blue-400 px-4  py-2 w-full '>
            </input>
           </div>
           <button type="submit" className="btn btn-primary" >sign up</button>




      </div>
    </div>
      
    </div>
    </form>
  )
}

export default Signup
