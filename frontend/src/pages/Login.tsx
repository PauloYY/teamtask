import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { Form, Field } from "../components/Form/Form";
import { useAuth } from "../hooks/hooks";

export default function Login(){
    const authContext = useAuth();
    const navigate = useNavigate();
    
    function submit(){
        // Criar requisicão quando for possível.

        authContext?.login("por enquanto este argumento (JWT) pode ser qualquer coisa.")
        
        navigate("/dashboard", {replace: true})
    }

    return (
        <main>
            <Modal exib={true}>
                <h1 className="title-main">Login</h1>

                <Form submitName="Entrar" submit={submit}>
                    <Field label="Digite seu email:" idInput="userEmail" type="email" />
                    <Field label="Digite sua senha:" idInput="userPassword" type="password"/>
                </Form>

                <p>Não possui cadastro?</p>
                <Link className="link" to="/register">Clique aqui para se cadastrar</Link>
            </Modal>
        </main>
    );
}