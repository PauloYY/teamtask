import type { ReactNode } from "react";
import styles from "./Toast.module.css";
import closeIcon from "../../assets/close.svg";

export type TypeToast = "success"|"warning"|"error"|"info"|"";

interface Properties {
    children : ReactNode;
    type? : TypeToast;
    setExib? : (arg0 : boolean) => void;
}

export default function Toast({children, type, setExib} : Properties){
    let styleType = "";

    if(type){
        switch(type){
            case "success":
                styleType = styles.success;
                break;
            case "warning":
                styleType = styles.warning;
                break;
            case "error":
                styleType = styles.error;
                break;
            case "info":
                styleType = styles.info;
                break;
        }
    }

    return(
        <div className={`${styles.toast} ${styleType}`}>
            {children}
            {
                setExib ?
                <img className={styles.closeButton} src={closeIcon} alt="Fechar" onClick={() => setExib(false)} /> :
                null
            }
        </div>
    )
}