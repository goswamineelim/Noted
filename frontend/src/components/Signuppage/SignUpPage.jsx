
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"
import {  useEffect } from "react";
export default function SignUpPage({userName, setuserName}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    if(cookies.token)
      navigate('/notepage');
  },[]);
    
    async function formSubmit(formData) {
    const body = {
      email: formData.get('email'),
      fullName:formData.get('fullName'),
      password: formData.get('password')
    }
    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', },
      body: formBody,
    }
    try {
      const response = await fetch(
        `/api/user/signup`, requestOptions)
        const result = await response.json()
        console.log(result)
        if(!result.sucess)
          throw result
        navigate('/notepage');
    }
    catch (error) {
    console.error(error);
    }
  };
  return (
    <>
    <div className='container'>
      <form action={formSubmit}>
        <h1>Sign Up</h1>
        <div className='input-box'>
          <input type='email' placeholder='Email' name='email' required/>
          <MdOutlineAlternateEmail  className="icon-email"/>
        </div>
        <div className='input-box'>
          <input type='text' placeholder='Fullname' name='fullName' required/>
          <FaUser className="icon"/>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' name='password' required/>
          <FaLock className="icon"/>
        </div>
        <div className='login-button'>
          <button name='rememberMe'><span>Sign Up</span></button>
        </div>
        <div className='login'>
          <p>Have an account? <Link to='/loginpage'>Login</Link></p>
        </div>
      </form>
    </div>

    </>
  )
}
