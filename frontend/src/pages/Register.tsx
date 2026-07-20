import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { Form, Field } from "../components/Form/Form";
import { useAuth } from "../hooks/hooks";
import { register } from "../services/auth.service";
import Toast, { type TypeToast } from "../components/Toast/Toast";

export default function Register(){
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const setStates = {setUserName, setUserEmail, setUserPassword}
    const statesNames = {
        userName : "setUserName",
        userEmail : "setUserEmail",
        userPassword : "setUserPassword"
    }

    const authContext = useAuth();
    const navigate = useNavigate();

    const [exibToast, setExibToast] = useState(false);
    const [typeToast, setTypeToast] = useState<TypeToast>("");
    const [messageToast, setMessageToast] = useState("");
    
    function submit(){
        const registerResponse = register({name: userName, email: userEmail, password: userPassword});
        
        if(!registerResponse.success){
            setExibToast(true);
            setTypeToast("error");
            setMessageToast(registerResponse.message);
            return;
        }

        const loginResponse = authContext?.login(userEmail, userPassword);

        if(!loginResponse?.success){
            setExibToast(true);
            setTypeToast("warning");
            setMessageToast(loginResponse?.message as string);
            return;
        }

        navigate("/dashboard");
    }
    return (
        <main>
            <Modal exib={true} >
                <h1 className="title-main">Cadastro</h1>

                <Form submitName="Cadastrar" submit={submit} statesNames={statesNames} setStates={setStates} toast={{setExibToast, setTypeToast, setMessageToast}}>
                    <Field label="Nome de usuário:" idInput="userName" type="text" />
                    <Field label="E-mail do usuário:" idInput="userEmail" type="email" />
                    <Field label="Defina uma senha:" idInput="userPassword" type="password" />
                </Form>

                <Link className="link" to="/login">Voltar para o login</Link>
            </Modal>
            
            {
                exibToast ?
                <Toast setExib={setExibToast} type={typeToast} >{messageToast}</Toast> :
                null
            }
        </main>
    );
}