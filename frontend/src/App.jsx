import LoginPage from './components/Loginpage/LoginPage.jsx'
import SignUpPage from './components/Signuppage/SignUpPage.jsx'
import Homepage from './components/Homepage/Homepage.jsx'
import Notepage from './components/Notepage/Notepage.jsx'
import Addnote from './components/Addnote/Addnote.jsx'
import Editnote from './components/Editnote/Editnote.jsx'
import Viewnote from './components/Viewnote/Viewnote.jsx'
import Binpage from './components/Binpage/Binpage.jsx'
import { Route ,Routes,useLocation } from "react-router-dom"
import { useEffect } from "react";
import "./index.css"
import { useState } from 'react';
export default function App() {
  const [userName, setuserName] = useState("");
  function DynamicStyles() {
    const location = useLocation();
  
    useEffect(() => {
      const stylesMap = {
        "/": "/static/css/Homepage.css",
        "/loginpage": "/static/css/Loginpage.css",
        "/signuppage": "/static/css/SignUpPage.css",
        "/notepage": "/static/css/Notepage.css",
        "/addnote": "/static/css/Addnote.css",
        "/binpage": "/static/css/Binpage.css",
      };
  
      const currentStyle =
        stylesMap[location.pathname] ||
        (location.pathname.startsWith("/editnote/") && "/static/css/Editnote.css") ||
        (location.pathname.startsWith("/viewnote/") && "/static/css/Viewnote.css");
  
      const existingLink = document.getElementById("dynamic-style");
      
      if (existingLink) {
        existingLink.remove();
      }
  
      if (currentStyle) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = currentStyle;
        link.id = "dynamic-style"; 
        document.head.appendChild(link);
      }
  
      return () => {
        const linkElement = document.getElementById("dynamic-style");
        if (linkElement) {
          linkElement.remove();
        }
      };
    }, [location.pathname]);
  
    return null;
  }
  return (
    <>
      <DynamicStyles/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/loginpage" element={<LoginPage userName={userName} setuserName={setuserName}/>}/>
        <Route path="/signuppage" element={<SignUpPage userName={userName} setuserName={setuserName}/>}/>
        <Route path="/notepage" element={<Notepage userName={userName} setuserName={setuserName}/>}/>
        <Route path="/addnote" element={<Addnote userName={userName} setuserName={setuserName}/>}/>
        <Route path="/editnote/:noteId" element={<Editnote />}/>
        <Route path="/viewnote/:noteId" element={<Viewnote />}/>
        <Route path="/binpage" element={<Binpage />}/>
      </Routes>
    </>
  )
}

