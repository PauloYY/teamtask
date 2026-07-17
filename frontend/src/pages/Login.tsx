import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { Form, Field } from "../components/Form/Form";
import { useAuth } from "../hooks/hooks";
import Toast, { type TypeToast } from "../components/Toast/Toast";

export default function Login(){
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    const statesNames = {
        userEmail: "setUserEmail",
        userPassword: "setUserPassword"
    };
    const setStates = {setUserEmail, setUserPassword};

    const authContext = useAuth();
    const navigate = useNavigate();

    const [exibToast, setExibToast] = useState(false);
    const [typeToast, setTypeToast] = useState<TypeToast>("");
    const [messageToast, setMessageToast] = useState("");
    
    function submit(){
        const response = authContext?.login(userEmail, userPassword);

        if(!response?.success){
            setExibToast(true);
            setTypeToast("warning");
            setMessageToast(response?.message as string);
            return;
        }
        
        navigate("/dashboard");
    }

    return (
        <main>
            <Modal exib={true}>
                <h1 className="title-main">Login</h1>

                <Form submitName="Entrar" submit={submit} statesNames={statesNames} setStates={setStates} toast={{setExibToast, setTypeToast, setMessageToast}} >
                    <Field label="Digite seu email:" idInput="userEmail" type="email" />
                    <Field label="Digite sua senha:" idInput="userPassword" type="password"/>
                </Form>

                <p>Não possui cadastro?</p>
                <Link className="link" to="/register">Clique aqui para se cadastrar</Link>
            </Modal>

            {
                exibToast ?
                <Toast type={typeToast} setExib={setExibToast}>{messageToast}</Toast> :
                null
            }
        </main>
    );
}