import React ,{useState}from 'react'
import { json } from 'react-router-dom';
import { useNavigate} from'react-router-dom';

const Login = (props) => {
  let history = useNavigate();
  const Host= "http://15.207.54.42:5000"
  const [cradensital,setcradensital] = useState({email:"",password:"",});
    // const [password,setpassword] = useState("");
    const handlesumit = async(e) => {
      e.preventDefault();
      // props.setProgress(10)
      // props.login(e.target.email.value,e.target.password.value)
      const response = await fetch(`${Host}/api/auth/login`, {
        method: "POST",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:cradensital.email,password:cradensital.password}), 
      });
      // props.setProgress(50)

      const json = await response.json();
        console.log(json);
        if (json.success) {
          localStorage.setItem('token',json.authtoken);
          history("/home");
          // props.setProgress(100)

      // props.showalert("successfuly login","success")
      setTimeout(() => {
        window.location.reload();
      }, 500);
        }
        else {
          // props.showalert("invalid credenstials","danger")
          history("/login")
        }
      }
      const onChange = (e) => {
        setcradensital({...cradensital,[e.target.name]: e.target.value });
        
      }
  return (
    <form onSubmit={handlesumit}>

    <div className='items-center justify-center'>
      <h1 className='text-4xl font-extralight text-center text-blue-400 mb-10 '>login</h1>
      <div className='flex flex-col rounded-md  gap-4 border-2 border-sky-300 rounded-x1 w-[600px] p-4 mx-auto'>
     
           <div className='my-0 rounded-md '>
            <label className='text-xl mr-10 my-2  text-gray-400'>gmail</label>
            <input type='text' value={cradensital.email} onChange={onChange} id="email" name="email"  className='border-2 rounded-md  border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <div className='my-0'>
            <label type="password"  className='text-xl mr-10 my-2 rounded-md  text-gray-400'> password</label>
            <input type='text' value={cradensital.password} onChange ={onChange} name='password'  id="exampleInputPassword1" className='border-2 rounded-md  border-blue-400 px-4 py-2 w-full '>
            </input>
           </div>
           <button type="submit" className="btn btn-primary" onSubmit={handlesumit}>sign in</button>



      </div>
    </div>
    </form>
  )
}

export default Login
