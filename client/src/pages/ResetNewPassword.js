import React, {useState} from 'react';
import Logo from "../components/Logo";
import {Button, Form, FormGroup} from "react-bootstrap";
import {resetPassword} from "../http/userAPI";

const ResetNewPassword = () =>
{
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

    const ResetPassword = async () =>
    {
        const response = await resetPassword(email, password);
        console.log(response);
    }

    return (
        <div className="d-flex flex-row green-background" style={{height: 970, margin: 0}}>
            <div className="form-white-container">
                <div className="form-elements-container">

                    <Logo></Logo>
                    <div className="log-in-label-container">
                        <span className="log-in-label">Новый пароль</span>
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
                                <Button variant="success" className="button-submit-reset mt-3" onClick={ResetPassword}>
                                    <span className="button-submit-label">Подтвердить</span>
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetNewPassword;