import React, {useContext, useState} from 'react';
import {Button, Col, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";
import {Context} from "../../index";

const AddOrder = ({show, onHide}) =>
{
    const {product} = useContext(Context);

    const [validated, setValidated] = useState(false);

    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event) =>
    {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    const onAmountChange = (e) =>
    {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))
        {
            setAmount(e.target.value);
        }
    };

    const OnClick = () =>
    {

    }


    return (
        <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Сделать заказ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Наименование товара</Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Select required type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)}>
                                {
                                    product.products.map(product =>
                                        <option key={product.id}>{product.name}</option>
                                    )
                                }
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>
                    <FormGroup as={Col} className="col-2">
                        <Form.Label column className="form-label">Количество</Form.Label>
                        <InputGroup className="filter-product-input-sizing" style={{width: 140}}>
                            <Form.Control required type="text" className="form-control" value={amount} onChange={onAmountChange}/>
                            <InputGroup.Text>шт.</InputGroup.Text>
                        </InputGroup>
                    </FormGroup>
                    <Form.Group className="mb-3" style={{marginTop: 25}}>
                        <Form.Label className="form-label">Место назначения </Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Select required type="text" className="form-control" >
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
                        <Button variant="outline-success" type="submit">
                            Заказать
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddOrder;