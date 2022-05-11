import React, {useContext, useState} from 'react';
import '../pages/css/auth.css';
import {Button, Form, FormGroup, Row} from "react-bootstrap";
import Logo from "../components/Logo";
import {NavLink, useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE, REGISTRATION_ROUTE, RESET_ROUTE} from "../utils/consts";
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() =>
{
    const navigate = useNavigate();

    const {user} = useContext(Context);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) =>
    {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignIn = async () =>
    {
        try
        {
            const data = await login(email, password);
            console.log(data);
            user.setUser(data);
            user.setIsAuth(true);
            console.log(user);
            navigate(PRODUCT_ROUTE);
        }
        catch(e)
        {
            alert("e.response.data.message");
        }

    }

    return (
        <div className="d-flex flex-row green-background" style={{height: 970, margin: 0}}>
            <div className="form-white-container">
                <div className="form-elements-container">

                    <Logo></Logo>
                    <div className="log-in-label-container">
                        <span className="log-in-label">Войти в аккаунт</span>
                    </div>

                    <Button variant="success" className="button-google">
                        <i className="fab fa-google left"></i>
                        <span className="button-google-label">Войти через гугл</span>
                    </Button>

                    <div className="divider-container">
                        <hr className="rounded"/>
                        <span className="divider-label">или</span>
                        <hr className="rounded"/>
                    </div>

                    <div className="exact-form-container">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <FormGroup>
                                <Form.Label className="form-label">Почта</Form.Label>
                                <Form.Control required type="text" className="form-control" onChange={e => setEmail(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните поле!
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label className="form-label">Пароль</Form.Label>
                                <Form.Control required type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните поле!
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mt-4">
                                <Button variant="success" className="button-submit mt-3" onClick={SignIn}>
                                    <span className="button-submit-label">Войти</span>
                                </Button>
                            </FormGroup>
                            <br/>
                            <NavLink to={RESET_ROUTE} className="link-label forgot-password-label">Забыли пароль?</NavLink>
                            <br/>
                            <span className="no-account-label">
                                Нет аккаунта?
                                <NavLink to={REGISTRATION_ROUTE} className="link-label">Зарегистрироваться</NavLink>
                            </span>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;