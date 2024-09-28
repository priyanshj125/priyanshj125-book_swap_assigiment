import React, { useState } from 'react'
import { json } from 'react-router-dom';
import { useNavigate} from'react-router-dom';

function Signup(props) {
  const Host= "http://localhost:5000/"
  let history = useNavigate();
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setcradensital({...cradensital,[e.target.name]: e.target.value });
    }

    const onImageChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile && selectedFile.type.startsWith('')) {
        setImage(selectedFile);
        setErrorMessage(null); // Clear previous error message
        setCredentials({
          ...credentials,
          pic: selectedFile
        }); // Update the pic field in credentials state
      } else {
        setErrorMessage('Please select a valid image file (JPEG, PNG, etc.).');
      }
    };

  const [cradensital,setcradensital] = useState({email:"",password:"",cpassword:"",name:"",pic:"https:aaaaaaaaaa//icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"});
   const handlesumit = async(e) => {
    e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:cradensital.name,email:cradensital.email,password:cradensital.password,pic:cradensital.pic}), 
    });

    const json = await response.json();

    console.log(json);
    if (json.success) {
      localStorage.setItem('token',json.authtoken);

      history("/home");

  }else{
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
           {/* <div className='my-1' id="pic">
            <label htmlFor="profilePic" className='text-xl rounded-md text-gray-400'>Profile Picture</label>
            <input type='file' name='profilePic'  value={cradensital.pic} onChange={onChange}  id="profilePic" className='border-2 rounded-md border-blue-400 px-4 py-2 w-full' accept="image/*" />
          </div> */}
            <div className='my-1' id="pic">
              <label htmlFor="profilePic" className='text-xl text-gray-400'>Profile Picture</label>
              <input 
                type='file' 
                name='profilePic' 
                onChange={onImageChange} 
                id="profilePic" 
                className='border-2 rounded-md border-blue-400 px-4 py-2 w-full' 
                accept="image/*"
                // value={cradensital.pic}
              />
            </div>
           <button type="submit" className="btn btn-primary" >sign up</button>




      </div>
    </div>
      
    </div>
    </form>
  )
}

export default Signup