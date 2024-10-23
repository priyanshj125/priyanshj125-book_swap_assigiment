import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useToast } from "@chakra-ui/toast";
// YQhtQKx_9n6UZ-VoTd2k9cTDgDc
// 767891938697554
// CLOUDINARY_URL=cloudinary://YQhtQKx_9n6UZ-VoTd2k9cTDgDc:767891938697554@djpd2fkjn

function Signup(props) {
  const Host = "http://localhost:5000/";
  let history = useNavigate();
  const [image, setImage] = useState(" ");
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [cradensital, setcradensital] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: "",
    pic: ""
  });

  const onChange = (e) => {
    setcradensital({ ...cradensital, [e.target.name]: e.target.value });
  };

  const onImageChange = (pics) => {
    if (pics == undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
      
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "swapbook");
      data.append("cloud_name", "djpd2fkjn");
      fetch("https://api.cloudinary.com/v1_1/djpd2fkjn/image/upload", {
        method: "post",
        body: data, 
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log("singup"+"zxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
          console.log(data.url.toString());
          console.log("singup"+"zxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
          // setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setPicLoading(false);
        });
    } 
    else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setPicLoading(false);
      return;
    }
    
  };
  const postdetail = (pics) => {
    // setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data= new FormData();
      data.append("file", pics);
      data.append("upload_preset", "swapbook");
      data.append("cloud_name", "djpd2fkjn");
      console.log("runnnnnnnnnnnnnnnnnnnnnnnnnnnnning");
      console.log(pics);
      fetch("https://api.cloudinary.com/v1_1/djpd2fkjn/image/upload",{method:"POST",body:data
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
        })
        .catch((err) => {
          console.log("error in uploding");
          console.log(err);
        });
    } else {
      // return setPicMessage("Please Select an Image");
    }
    
  };

  const submitimage=()=>{
    const data= new FormData();
    data.append("file", image);
    data.append("upload_preset", "swapbook");
    data.append("cloud_name", "djpd2fkjn");

    console.log("aaaaaaaaaaaaaaaaaaaaa");
    console.log(data);
    console.log("aaaaaaaaaaaaaaaaaaaaa");

    fetch("https://api.cloudinary.com/v1_1/djpd2fkjn/image/upload",{method:"POST",body:data
    }).then((res)=>res.json()).then((data)=>{
    console.log(data);
    }).catch((err)=>{
      console.log("eror in signup");
      console.log(err);
      console.error(err);
    })


  }






  const handlesumit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${Host}api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cradensital.name,
        email: cradensital.email,
        password: cradensital.password,
        pic: image
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      history("/home");
    } else {
      history("/signup");
    }
  };

  return (
    <form onSubmit={handlesumit}>
      <div className="items-center justify-center">
        <h1 className="text-4xl font-extralight text-center text-blue-400 mb-10">Sign-up</h1>
        <div className="flex flex-col rounded-md gap-4 border-2 border-sky-300 rounded-x1 w-[600px] p-4 mx-auto">
          <div className="my-1 w-15">
            <label className="text-xl rounded-md mr-10 my-2 text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={cradensital.name}
              onChange={onChange}
              className="border-2 rounded-md border-blue-400 px-4 py-2 w-full"
            />
          </div>

          <div className="my-0 rounded-md">
            <label className="text-xl mr-10 my-2 text-gray-400">Gmail</label>
            <input
              type="email"
              onChange={onChange}
              value={cradensital.email}
              name="email"
              className="border-2 rounded-md border-blue-400 px-4 py-2 w-full"
            />
          </div>

          <div className="my-0">
            <label className="text-xl mr-10 my-2 text-gray-400">Confirm Password</label>
            <input
              type="password"
              name="password"
              value={cradensital.password}
              onChange={onChange}
              placeholder="6 letter must contain"
              className="border-2 rounded-md border-blue-400 px-4 py-2 w-full"
            />
          </div>

          <div className="my-0">
            <label className="text-xl mr-10 text-gray-400">Password</label>
            <input
              type="text"
              name="cpassword"
              value={cradensital.cpassword}
              onChange={onChange}
              className="border-2 rounded-md border-blue-400 px-4 py-2 w-full"
            />
          </div>

          <div className='my-1' id="pic">
              <label htmlFor="profilePic" className='text-xl text-gray-400'>Profile Picture</label>
              <input 
                type='file' 
                name='profilePic' 
                onChange={(e)=>postdetail(e.target.files[0])}
                id="profilePic" 
                className='border-2 rounded-md border-blue-400 px-4 py-2 w-full' 
                accept="image/*"
                // value={cradensital.pic}
              />
            </div>
          <button type="submit"  className="btn btn-primary">
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}

export default Signup;
