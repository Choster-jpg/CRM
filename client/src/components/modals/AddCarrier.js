import React, {useState} from 'react';
import {Button, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";
import {createProduct} from "../../http/productAPI";
import {CARRIER_ROUTE, PRODUCT_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const AddCarrier = ({show, onHide}) =>
{
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (event) =>
    {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const addCarrier = () =>
    {
        createProduct({city: city, name: name}).then(() =>
        {
            onHide();
            navigate(CARRIER_ROUTE);
        })
    }

    return (
        <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Нанять перевозчика</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Наименование</Form.Label>
                        <Form.Control required type="text" className="form-control"
                                      style={{width: 400}} value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, заполните поле!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Город </Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Select required type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)}>
                                <option>Гродно</option>
                                <option>Минск</option>
                                <option>Брест</option>
                                <option>Могилёв</option>
                                <option>Гомель</option>
                                <option>Витебск</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>
                    <hr style={{marginTop: 30}}/>
                    <FormGroup>
                        <Button variant="outline-success" onClick={addCarrier}>
                            Нанять
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddCarrier;