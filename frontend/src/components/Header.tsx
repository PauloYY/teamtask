import { Link } from "react-router-dom";
import { useTheme } from "../hooks/hooks";
import "../styles/header.css";

export default function Header(){
    const contextTheme = useTheme();
    
    return (
        <header className="header">
            <div className="header-top-row">
                <h1 className="header-title">TeamTask</h1>
                
                <nav >
                    <ul className="nav">
                        <li className="nav-li"><Link to="/dashboard" className="nav-item">Home</Link></li>
                        <li className="nav-li"><Link to="/groups" className="nav-item">Groups</Link></li>
                        <li className="nav-li"><Link to="/tasks" className="nav-item">Tasks</Link></li>
                    </ul>
                </nav>
            </div>
            
            <button
                className="button-theme"
                onClick={contextTheme?.toDark}
                style={{backgroundColor: "#243A69", color: "#EAF1FF"}}
            >
                Fundo escuro
            </button>
            
            <button
                className="button-theme"
                onClick={contextTheme?.toLight}
                style={{backgroundColor: "#EAF1FF", color: "#243A69"}}
            >
                Fundo claro
            </button>
        </header>
    )
}