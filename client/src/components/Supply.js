import React, {createContext, useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import SupplyItem from "./SupplyItem";
import OrderConfirmItem from "./OrderConfirmItem";
import {fetchSupply} from "../http/supplyAPI";
import {fetchOrders} from "../http/orderAPI";
import PaginationSupply from "./PaginationSupply";

const Supply = observer(() =>
{
    const {supply} = useContext(Context);
    const {orders} = useContext(Context);

    useEffect(()=> {
        fetchSupply().then(data => supply.setSupplies(data.rows));
        fetchOrders().then(data => orders.setOrders(data.rows));
    }, [])

    const [addressFrom, setAddressFrom] = useState(null);
    const [addressTo, setAddressTo] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        fetchSupply(addressFrom, addressTo, date, supply.limit, supply.page).then(data =>
        {
            supply.setSupplies(data.rows);
            supply.setTotalCount(data.count);
        });
    }, [addressFrom, addressTo, date, supply.page]);

    let unconfirmed_orders = orders.orders.filter(order => order.is_in_process == false);

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
                        unconfirmed_orders.map(order =>
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
                                    <Form.Select required type="text" className="form-control" value={addressFrom}
                                                 onChange={
                                                            (e) =>
                                                            {
                                                                if(e.target.value == "--")
                                                                    setAddressFrom(null);
                                                                else
                                                                    setAddressFrom(e.target.value);
                                                            }
                                                          }>
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
                                    <Form.Select required type="text" className="form-control" value={addressTo} onChange={
                                        (e) =>
                                        {
                                            if(e.target.value == "--")
                                                setAddressTo(null);
                                            else
                                                setAddressTo(e.target.value);}}>
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

                <div style={{marginLeft: 590, marginTop:750, position: "absolute"}}>
                    <PaginationSupply />
                </div>
            </Card>
        </div>
    );
});

export default Supply;