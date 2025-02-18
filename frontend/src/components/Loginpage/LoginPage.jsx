
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link ,useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import {  useEffect,useState } from "react";
export default function LoginPage({userName, setuserName}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        if(cookies.token)
          navigate('/notepage');
      },[]);
      const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);
  async function formSubmit(formData) {
    if (rememberMe) {
      
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    const body = {
      email: formData.get('email'),
      password: formData.get('password'),
      
    }
    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', },
      body: formBody
    }
    try {
      const response = await fetch(
        `https://noted-back.onrender.com/user/signin`, requestOptions)
        const result = await response.json()
        console.log(result.token)
        // setCookie(result.token)
        if(!result.sucess)
          throw result
        navigate('/notepage');
    }
    catch (error) {
    console.error(error);
    }
  };
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);
  return (
    <>
      <div className='container'>
        <form action={formSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='email' placeholder='Email' name='email' value={username}
          onChange={handleUsernameChange} required />
            <FaUser className="icon" />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' name='password' value={password}
          onChange={handlePasswordChange} required />
            <FaLock className="icon" />
          </div>
          <div className='remember-box'>
            <label>
              <input type='checkbox' name='rememberMe' checked={rememberMe}
            onChange={handleRememberMeChange}/>
              Remember me</label>
            <a href='/loginpage'>Forgot Password?</a>
          </div>
          <div className='login-button'>
            <button name='rememberMe'><span>Login</span></button>
          </div>
          <div className='register'>
            <p>Don't have an account? <Link to='/signuppage'>Register</Link></p>
          </div>
        </form>
      </div>

    </>
  )
}
