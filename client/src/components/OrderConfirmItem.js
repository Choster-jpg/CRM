import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import StatusBox from "./StatusBox";
import {ArrowRightCircle, BookmarkCheckFill, FileExcelFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";


const OrderConfirmItem = observer(({order}) =>
{
    return (
        <Col md={12}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">Заказ #{order.id}</Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div style={{background:"transparent",width:400, marginTop: 2}}>
                            <Card.Title>Шлакоблок Восхитительный ШБ250</Card.Title>
                        </div>
                        <div style={{background:"transparent", width:100, paddingLeft: 30, marginTop: 2}}>
                            <Card.Title>{order.amount}</Card.Title>
                        </div>
                        <div style={{background:"transparent", width:200, paddingLeft: 150, marginTop: 2}}>
                            <Button variant="outline-success" style={{width: 50, height: 30, marginTop: -1}}
                                    className="d-flex justify-content-center align-items-center">
                                <BookmarkCheckFill size={16}/>
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default OrderConfirmItem;