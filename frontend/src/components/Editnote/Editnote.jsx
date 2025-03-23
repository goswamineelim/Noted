
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
export default function Editnote() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  
  useEffect(() => {
    if (!cookies.token)
      navigate('/loginpage');
  }, []);
  const [notes, setNotes] = useState([]);
  const [tags, setTags]=useState(["default"])
  useEffect(() => {
    const fetchNotes = async () => {
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      };

      try {
        const response = await fetch(`/api/note/${noteId}`, requestOptions);

        if (response.ok) {
          const result = await response.json();
          setNotes(result);
          setTags(result.label)
        } else {
          console.error('Failed to fetch notes:', response.status);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();

  }, []);
  async function formSubmit(formData) {
    const body = {
        title: formData.get('title'),
        body: formData.get('body'),
        label:[tags] 
    }
    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');
    const requestOptions = {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', },
      body: formBody
    }
    try {
      const response = await fetch(
        `/api/note/${noteId}`, requestOptions)
        const result = await response.json()
        
        // console.log(result.token)
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
          <h1>Edit Note</h1>
          <div className='input-box'>
            <input type='text' placeholder='Title...' name='title' defaultValue={notes.title}required />
          </div>
          <div className='input-box2'>
            <textarea type='textarea' placeholder='Note..' name='body' defaultValue={notes.body} required />
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
            <button name='rememberMe'><span>Edit</span></button>
          </div>

        </form>
      </div>

    </>
  )
}
