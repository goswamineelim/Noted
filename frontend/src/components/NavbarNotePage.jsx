import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export default function Navbar()
{

    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const handleLogout = () => {
        removeCookie('token', { path: '/' }); // Properly remove the cookie
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