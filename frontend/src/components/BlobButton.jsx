import React from 'react';
import { useNavigate } from "react-router-dom"
function BlobButton({ label, _id, action, style, setNotes, count, setCount }) {
  const navigate = useNavigate();
  function handleClick() {
    if (action === "edit") {
      navigate(`/editnote/${_id}`)
    }
    else if (action === "view") {
      navigate(`/viewnote/${_id}`)
    }
    else if (action === "view") {
      navigate(`/viewnote/${_id}`)
    }
    else if (action === "restore") {
      console.log(1)
      const fetchNotes = async () => {
        const requestOptions = {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        };

        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/note/${_id}`, requestOptions);

          if (response.ok) {
            const result = await response.json();
            const label = result.label.filter(label => label !== "bin");
            const body = {
              ...result,
              label: [label]
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
                `https://to-do-list-three-red-15.vercel.app/note/${_id}`, requestOptions)
              const result = await response.json()

              // console.log(result.token)
              // setCookie(result.token)
              if (!result.sucess)
                throw result
              setCount(count+1)

            }
            catch (error) {
              console.error(error);
            }
          } else {
            console.error('Failed to fetch notes:', response.status);
          }
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
      fetchNotes();
    }
    else {
      const deleteNotes = async () => {
        const requestOptions = {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        };
        try {
          const response = await fetch(`https://to-do-list-three-red-15.vercel.app/note/delete/${_id}`, requestOptions);

          if (response.ok) {
            const result = await response.json();
            setCount(count + 1)
          } else {
            console.error('Failed to delete notes:', response.status);
          }
        } catch (error) {
          console.error('Error deleting notes:', error);
        }
      };

      deleteNotes();
    }
  }
  return (
    <div className="buttons">
      <button className="blob-btn" onClick={handleClick} style={style ? style : null}>
        {label}
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </button>
      <br />

      {/* SVG Filter for Gooey Effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default BlobButton;
