import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/hooks";
import styles from "./Header.module.css";

export default function Header(){
    const contextTheme = useTheme();
    
    return (
        <header className={styles.header}>
            <div className={styles.headerTopRow}>
                <h1 className={styles.titleHeader}>TeamTask</h1>
                
                <nav >
                    <ul className={styles.nav}>
                        <li className={styles.navLi}><Link to="/dashboard" className={styles.navItem}>Home</Link></li>
                        <li className={styles.navLi}><Link to="/groups" className={styles.navItem}>Groups</Link></li>
                        <li className={styles.navLi}><Link to="/tasks" className={styles.navItem}>Tasks</Link></li>
                    </ul>
                </nav>
            </div>
            
            <button
                className={styles.buttonTheme}
                onClick={contextTheme?.toDark}
                style={{backgroundColor: "#243A69", color: "#EAF1FF"}}
            >
                Fundo escuro
            </button>
            
            <button
                className={styles.buttonTheme}
                onClick={contextTheme?.toLight}
                style={{backgroundColor: "#EAF1FF", color: "#243A69"}}
            >
                Fundo claro
            </button>
        </header>
    )
}