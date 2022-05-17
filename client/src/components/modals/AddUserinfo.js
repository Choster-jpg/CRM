import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";

const AddUserinfo = ({show, onHide}) =>
{
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const onClick = () =>
    {

    }

    return (
        <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить информацию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Отображаемое имя</Form.Label>
                        <Form.Control required type="text" className="form-control" style={{width: 400}}
                                      value={displayName}
                                      onChange={(e) => setDisplayName(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, заполните поле!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Фирма</Form.Label>
                        <Form.Control required type="text" className="form-control" style={{width: 400}}
                                      value={company}
                                      onChange={(e) => setCompany(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, заполните поле!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Номер телефона</Form.Label>
                        <Form.Control required type="text" className="form-control" style={{width: 400}}
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, заполните поле!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Аватар</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <hr style={{marginTop: 30}}/>
                    <FormGroup>
                        <Button variant="outline-success" onClick={onClick}>
                            Назначить
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserinfo;