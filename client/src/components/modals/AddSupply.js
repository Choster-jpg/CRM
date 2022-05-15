import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../../index";
import {Button, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {fetchCarrier} from "../../http/carrierAPI";
import {createSupply} from "../../http/supplyAPI";
import {useNavigate} from "react-router-dom";
import {SUPPLY_ROUTE} from "../../utils/consts";

const AddSupply = ({show, onHide}) =>
{
    const navigate = useNavigate();

    const {carrier} = useContext(Context);

    useEffect(() => {
        fetchCarrier().then(data => carrier.setCarriers(data.rows))
    }, []);

    const [validated, setValidated] = useState(false);

    const [addressFrom, setAddressFrom] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [date, setDate] = useState("");
    const [carr, setCarr] = useState("");

    const handleSubmit = (event) =>
    {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const onClick = () =>
    {
        const carrier_id = carrier.carriers.filter(carrier => carrier.name == carr)[0].id;
        createSupply({address_from: addressFrom, address_to: addressTo, date: date, carrier_id: carrier_id}).then(data => console.log(data));
        onHide();
        navigate(SUPPLY_ROUTE);
    }

    const today = new Date();

    return (
        <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Организовать поставку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Адрес, откуда</Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Select required type="text" className="form-control" value={addressFrom} onChange={(e) => setAddressFrom(e.target.value)}>
                                <option>Гродно</option>
                                <option>Минск</option>
                                <option>Брест</option>
                                <option>Могилёв</option>
                                <option>Гомель</option>
                                <option>Витебск</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Адрес, куда</Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Select required type="text" className="form-control" value={addressTo} onChange={(e) => setAddressTo(e.target.value)}>
                                <option>Гродно</option>
                                <option>Минск</option>
                                <option>Брест</option>
                                <option>Могилёв</option>
                                <option>Гомель</option>
                                <option>Витебск</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Дата</Form.Label>
                        <InputGroup style={{width: 200}}>
                            <DatePicker minDate={today} selected={date} onChange={(e) => setDate(e)}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label">Перевозчик</Form.Label>
                        <InputGroup style={{width: 200}}>
                            <Form.Select required type="text" className="form-control" value={carr} onChange={(e) => setCarr(e.target.value)}>
                                {
                                    carrier.carriers.map(carrier =>
                                        <option key={carrier.id}>{carrier.name}</option>
                                    )
                                }
                            </Form.Select>
                        </InputGroup>
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

export default AddSupply;