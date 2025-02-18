import Navbar from "../Navabar"
import { useNavigate } from "react-router-dom"
export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="navbar" >
                <h2 className="logo">Noted!</h2>
            </div>
            <div className="main-content">
                <div className="left-panel">
                    <h1>
                        {/* <span className="bold">Welcome to Notify</span>*/}
                    </h1>
                </div>
                <div className="right-panel">
                    <h2>Get started</h2>
                    <div className="buttons">
                        <button className="login" onClick={()=>navigate('./loginpage')}>Log in</button>
                        <button className="signup"onClick={()=>navigate('./signuppage')}>Sign up</button>
                    </div>
                    <p className="try-first">Try it now!</p>
                    <footer>

                    </footer>
                </div>
            </div>
        </div>
    );
}