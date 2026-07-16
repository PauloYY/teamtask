import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { Form, Field } from "../components/Form/Form";
import { useAuth } from "../hooks/hooks";

export default function Register(){
    const authContext = useAuth();
    const navigate = useNavigate();
    
    function submit(){
        // Criar requisicão quando for possível.

        authContext?.login("por enquanto este argumento (JWT) pode ser qualquer coisa.")
        
        navigate("/dashboard", {replace: true})
    }
    return (
        <main>
            <Modal exib={true} >
                <h1 className="title-main">Cadastro</h1>

                <Form submitName="Cadastrar" submit={submit} >
                    <Field label="Nome de usuário:" idInput="userName" type="text" />
                    <Field label="E-mail do usuário:" idInput="userEmail" type="email" />
                    <Field label="Defina uma senha:" idInput="userPassword" type="password" />
                </Form>

                <Link className="link" to="/login">Voltar para o login</Link>
            </Modal>
        </main>
    );
}