import React, {createContext, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import SupplyItem from "./SupplyItem";
import DatePicker from "react-datepicker";
import OrderConfirmItem from "./OrderConfirmItem";

const Supply = observer(() =>
{
    const {supply} = useContext(Context);
    const {order} = useContext(Context);

    const [addressFrom, setAddressFrom] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [date, setDate] = useState('');

    const today = new Date();

    return (
        <div className="d-flex flex-row">

            <Card className="div-supply-half-container">
                <div className="div-headers-carriers">
                    <div className="d-flex flex-row" style={{paddingTop: 30}}>
                        <span className="span-orders-for-confirm">Заказы на подтверждение</span>
                    </div>
                    <hr className="divider-form-sort-supply" style={{marginTop: 7}}/>
                </div>

                <Row className="d-flex" style={{marginTop: 55}}>
                    {
                        order.orders.map(order =>
                            <OrderConfirmItem key={order.id} order={order}/>
                        )
                    }
                </Row>
            </Card>


            <Card className="div-supply-half-container">
                <div className="div-sorting-options">
                    <Form>
                        <Row className="col-md-9">
                            <FormGroup as={Col} className="col-4">
                                <Form.Label column className="form-label">Откуда</Form.Label>
                                <InputGroup style={{width: 170}}>
                                    <Form.Select required type="text" className="form-control" value={addressFrom} onChange={(e) => setAddressFrom(e.target.value)}>
                                        <option>--</option>
                                        <option>Гродно</option>
                                        <option>Минск</option>
                                        <option>Брест</option>
                                        <option>Могилёв</option>
                                        <option>Гомель</option>
                                        <option>Витебск</option>
                                    </Form.Select>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup as={Col} className="col-4">
                                <Form.Label column className="form-label">Куда</Form.Label>
                                <InputGroup style={{width: 170}}>
                                    <Form.Select required type="text" className="form-control" value={addressTo} onChange={(e) => setAddressTo(e.target.value)}>
                                        <option>--</option>
                                        <option>Гродно</option>
                                        <option>Минск</option>
                                        <option>Брест</option>
                                        <option>Могилёв</option>
                                        <option>Гомель</option>
                                        <option>Витебск</option>
                                    </Form.Select>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup as={Col} className="col-4">
                                <Form.Label column className="form-label">Дата</Form.Label>
                                <InputGroup style={{width: 170}}>
                                    <DatePicker minDate={today} selected={date} onChange={(e) => setDate(e)}/>
                                </InputGroup>
                            </FormGroup>
                        </Row>
                    </Form>
                    <hr className="divider-form-sort-supply"/>
                </div>

                <Row className="d-flex">
                    {
                        supply.supplies.map(supply =>
                            <SupplyItem key={supply.id} supply={supply}/>
                        )
                    }
                </Row>
            </Card>
        </div>
    );
});

export default Supply;