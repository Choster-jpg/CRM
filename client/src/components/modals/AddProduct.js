import React, {useState} from 'react';
import {Button, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";
import {createProduct} from "../../http/productAPI";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";

const AddProduct = ({show, onHide}) =>
{
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    const onPriceChange = (e) =>
    {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))
        {
            setPrice(e.target.value);
        }
    };

    const handleSubmit = (event) =>
    {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const addProduct = () =>
    {
        createProduct({name: name, amount: 0, price: price}).then(() =>
        {
            onHide();
            navigate(PRODUCT_ROUTE);
        })
    }

    return (
        <Modal id="productModal" size="md" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Наименование</Form.Label>
                        <Form.Control required type="text" className="form-control" style={{width: 400}}
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, заполните поле!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Цена за 1шт. </Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Control required type="text" className="form-control" value={price} onChange={onPriceChange}/>
                            <InputGroup.Text>.00 $</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                Пожалуйста, заполните поле!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <hr style={{marginTop: 30}}/>
                    <FormGroup>
                        <Button variant="outline-success" type="submit" onClick={addProduct}>
                            Добавить
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddProduct;