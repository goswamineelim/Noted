
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link ,useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import {  useEffect,useState } from "react";
export default function LoginPage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [tags, setTags]=useState(["default"])
    useEffect(() => {
        if(!cookies.token)
          navigate('/loginpage');
      },[]);
  async function formSubmit(formData) {
    
    const body = {
        title: formData.get('title'),
        body: formData.get('body'),
        label: tags
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
        `/api/note`, requestOptions)
        const result = await response.json()
        console.log(body.label)
        // setCookie(result.token)
        if(!result.sucess)
          throw result
        navigate('/notepage');
    }
    catch (error) {
    console.error(error);
    }
  };
  function handleKeyDown(e)
  {
    console.log(1);
    if(e.key === 'Enter')
    {
      e.preventDefault();
      setTags([...tags,e.target.value])
      e.target.value= ""
    }
    if(!e.target.value.trim())
      return
  }
  function removeTag(index)
  {
    setTags(tags.filter((el,i)=>i!==index))
  }
  return (
    <>
      <div className='container'>
        <form action={formSubmit}>
          <h1>Add Note</h1>
          <div className='input-box'>
            <input type='text' placeholder='Title...' name='title' required />
          </div>
          <div className='input-box2'>
            <textarea type='textarea' placeholder='Note..' name='body' required />
          </div>
          <div className='input-box3'>
            
            <input type='text' placeholder='Label...' name='label' onKeyDown={handleKeyDown} />
            
          </div>
          <div className="tags-container">
          {
            tags.map((tag,index)=>(
              <div key={index} className="tag-item">
              <span className="text">{tag}</span>
              <span className="close" onClick={()=>{
                if(tags.length!=1)
                removeTag(index)}}>&times;</span>
            </div>
          
            ))
          }
          </div>
          
          
          <div className='login-button'>
            <button name='rememberMe'><span>Add Note</span></button>
          </div>
          
        </form>
      </div>

    </>
  )
}
