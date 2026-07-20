import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import styles from "./Form.module.css";
import type { TypeToast } from "../Toast/Toast";

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
    statesNames : { [key : string] : string };
    setStates : { [key : string] : Dispatch<SetStateAction<string>> };
    toast? : {
        setExibToast : Dispatch<SetStateAction<boolean>>,
        setTypeToast : Dispatch<SetStateAction<TypeToast>>,
        setMessageToast : Dispatch<SetStateAction<string>>
    };
}

export function Form({children, submitName, submit, statesNames, setStates, toast} : FormProperties){
    const states : Inputs = {};
    Object.keys(statesNames).map(stateName => states[stateName] = "");
    const [inputsValue, setInputValue] = useState<Inputs>(states);

    function submitHandle(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        if(
            Object.values(inputsValue).some(inputValue =>
                inputValue === "" ||
                inputValue === null)
        ){
            toast?.setExibToast(true);
            toast?.setTypeToast("warning");
            toast?.setMessageToast("Todos os campos devem ser preenchidos!");
            return;
        }

        submit();
    }

    function setValues(idInput: string, value: string) {
        setInputValue(prev => ({
            ...(prev ?? {}),
            [idInput]: value,
        }));

        const stateName = statesNames[idInput]
        setStates[stateName](value);
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