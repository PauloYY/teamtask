import { createContext, useContext, useState, type ReactNode } from "react";
import styles from "./Form.module.css";

interface Inputs {
    [idInput : string] : string;
}

interface InterfaceInputsContext {
    inputs : Inputs;
    setValues : (idInput : string, value : string) => void;
}

const InputsContext = createContext<InterfaceInputsContext|null>(null);

interface FormProperties {
    children : ReactNode;
    submitName : string;
    submit : () => void;
}

export function Form({children, submitName, submit} : FormProperties){
    const [inputsValue, setInputValue] = useState<Inputs|null>(null);

    function submitHandle(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        submit();
    }

    function setValues(idInput: string, value: string) {
        setInputValue(prev => ({
            ...(prev ?? {}),
            [idInput]: value,
        }));
    }

    return(
        <InputsContext.Provider value={{
            inputs: inputsValue ?? {},
            setValues: setValues
        }}>
            <form className={styles.form} onSubmit={submitHandle}>
                {children}
                <input className={styles.submit} type="submit" value={submitName} />
            </form>
        </InputsContext.Provider>
     )
}

interface FieldProperties {
    label : string;
    idInput : string;
    type : "text"|"number"|"date"|"email"|"tel"|"password";
}

export function Field({label, idInput, type} : FieldProperties){
    const contextInputs = useContext(InputsContext);

    return(
        <div className={styles.field}>
            <label htmlFor={idInput}>{label}</label>
            <input className={styles.input} type={type} id={idInput} onChange={e => contextInputs?.setValues(idInput, e.target.value)}/>
        </div>
    )
}