import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
export default function Navbar()
{
    const navigate = useNavigate();
    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
    };
    return(
        <nav className="navbar">
            <Link to="/"  >Home</Link>
            <Link to="/notepage">📑 All Notes</Link>
            <Link to="/addnote">+ Add Notes</Link>
            <Link to="/binpage">♻ Bin</Link>
            <Link to="/logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</Link>
        </nav>
    )
}