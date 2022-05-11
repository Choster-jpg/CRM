import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, PRODUCT_ROUTE} from "../utils/consts";
import '../pages/css/reg.css';
import {Button, Form, FormGroup, NavLink} from "react-bootstrap";
import Logo from "../components/Logo";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Reg = observer(() =>
{
    const navigate = useNavigate();

    const location = useLocation();
    const isLogin = location.pathname == LOGIN_ROUTE;

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
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');

    const SignUp = async () =>
    {
        const data = await registration(email, password, name, lastname, phone, company);
        console.log(data);
        navigate(PRODUCT_ROUTE);
    }

    return (
        <div className="green-background-reg">
            <div className="form-white-container-reg">
                <div className="form-elements-container-reg">
                    <Logo></Logo>

                    <div className="reg-label-container">
                        <span className="reg-label">Создайте свой аккаунт</span>
                    </div>

                    <Button variant="success" className="button-google-reg">
                        <i className="fab fa-google left"></i>
                        <span className="button-google-label-reg">Войти через гугл</span>
                    </Button>

                    <div className="divider-container-reg">
                        <hr className="rounded-reg"/>
                        <span className="divider-label-reg">или</span>
                        <hr className="rounded-reg"/>
                    </div>

                    <div className="exact-form-container-reg">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <FormGroup>
                                <Form.Label className="form-label-reg">
                                    Почта
                                    <span className="red-star-require">
                                        *
                                    </span>
                                </Form.Label>
                                <Form.Control required type="text" onChange={e => setEmail(e.target.value)} className="form-control-reg"/>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните поле!
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label className="form-label-reg">
                                    Фамилия
                                    <span className="red-star-require">
                                        *
                                    </span>
                                </Form.Label>
                                <Form.Control required type="text" onChange={e => setLastname(e.target.value)} className="form-control-reg"/>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните поле!
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label className="form-label-reg">
                                    Имя
                                    <span className="red-star-require">
                                        *
                                    </span>
                                </Form.Label>
                                <Form.Control required type="text" onChange={e => setName(e.target.value)} className="form-control-reg"/>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните поле!
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label className="form-label-reg">
                                    Пароль
                                    <span className="red-star-require">
                                        *
                                    </span>
                                </Form.Label>
                                <Form.Control required type="password" onChange={e => setPassword(e.target.value)} className="form-control-reg"/>
                                <Form.Control.Feedback type="invalid">
                                    Пожалуйста, заполните поле!
                                </Form.Control.Feedback>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label className="form-label-reg">Номер телефона</Form.Label>
                                <Form.Control type="text" onChange={e => setPhone(e.target.value)} className="form-control-reg"/>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <Form.Label className="form-label-reg">Фирма</Form.Label>
                                <Form.Control type="text" onChange={e => setCompany(e.target.value)} className="form-control-reg"/>
                            </FormGroup>
                            <FormGroup className="mt-4">
                                <Button onClick={SignUp} variant="success" className="button-submit-reg mt-3">
                                    <span className="button-submit-label-reg">Зарегистрироваться</span>
                                </Button>
                            </FormGroup>
                            <br/>
                            <span className="is-account-label-reg">
                                Уже есть аккаунт?
                                <NavLink to={LOGIN_ROUTE} className="link-label-reg">Войти</NavLink>
                            </span>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Reg;