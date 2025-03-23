
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
          console.log(Array.isArray(result.label))
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
 function formSubmit(formData) {
    navigate(-1);
  };

  return (
    <>
      <div className='container'>
        <form action={formSubmit}>
          <h1>View Note</h1>
          <div className='input-box'>
            <input type='text' placeholder='Title...' name='title' value={notes.title} readOnly />
          </div>
          <div className='input-box2'>
            <textarea type='textarea' placeholder='Note..' name='body' value={notes.body} readOnly />
          </div>
          <div className="tags-container">
          {
            tags.map((tag,index)=>(
              <div key={index} className="tag-item">
              <span className="text">{tag}</span>
              <span className="close">&times;</span>
            </div>
          
            ))
          }
          </div>
          <div className='login-button'>
            <button name='rememberMe'><span>Back</span></button>
          </div>

        </form>
      </div>

    </>
  )
}
