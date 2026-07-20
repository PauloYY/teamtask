import type { ReactNode } from "react";
import styles from "./Modal.module.css";

interface Properties {
    children : ReactNode;
    exib : boolean;
    setExib? : (arg0 : boolean) => void;
}

export default function Modal({children, exib, setExib} : Properties) {
    if(exib){
        return(
            <div className={styles.centralizer}>
                <section className={styles.modal}>
                    {children}
                    {
                        setExib !== undefined ? 
                        <button onClick={() => setExib?.(false)}>Fechar</button> :
                        null
                    }
                </section>
            </div>
        )
    }
}