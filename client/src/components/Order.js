import React, {createContext, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import OrderItem from "./OrderItem";

const Order = observer(() =>
{
    const {order} = useContext(Context);

    return (
        <Card className="div-main-content-container">
            <div className="div-headers-carriers">
                <div className="d-flex flex-row">
                    <span className="span-titles-carriers-page" style={{marginLeft: 15}}>Заказчик</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 288}}>Товар</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 410}}>Количество</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 100}}>Дата поставки</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 103}}>Утвержден</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 130}}>Опции</span>
                </div>
                <hr className="divider-form-sort" style={{marginTop: 5}}/>
            </div>

            <Row className="d-flex">
                {
                    order.orders.map(order =>
                        <OrderItem key={order.id} order={order}/>
                    )
                }
            </Row>
        </Card>
    );
});

export default Order;