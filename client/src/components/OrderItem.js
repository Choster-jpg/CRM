import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {FileExcelFill} from "react-bootstrap-icons";
import StatusBox from "./StatusBox";

const OrderItem = ({order, display_name, product_name, supply_date}) =>
{
    return (
        <Col md={12}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 40, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">Заказ #{order.id}</Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div style={{background: "transparent", width: 340}} className="d-flex">
                            <div className="order-user-avatar" style={{background: "green"}}/>
                            <Card.Title style={{marginLeft: 20, marginTop: 13}}>{display_name}</Card.Title>
                        </div>
                        <div style={{background: "transparent", width: 460}}>
                            <Card.Text style={{marginLeft: 20, marginTop: 13, fontSize: 16, fontWeight: "bold"}}>
                                {product_name}
                            </Card.Text>
                        </div>
                        <div style={{background: "transparent", width: 90}} className="d-flex justify-content-center">
                            <Card.Text style={{marginLeft: 20, marginTop: 13, fontSize: 16, fontWeight: "bold"}}>{order.amount}</Card.Text>
                        </div>
                        <div style={{background: "transparent", width: 300}} className="d-flex justify-content-center">
                            <Card.Text className="span-carrier-city" style={{marginLeft: 20, marginTop: 13}}>
                                {order.is_in_process ? {supply_date} : "--"}
                            </Card.Text>
                        </div>
                        <div style={{background: "transparent", width: 150, paddingLeft: 50, paddingTop: 15}}>
                            <StatusBox status={!order.is_in_process}/>
                        </div>
                        <div style={{background: "transparent", width: 200, paddingLeft: 75}}>
                            <Button variant="outline-danger" style={{width: 70, height: 40, marginTop: 5}}
                                    className="d-flex justify-content-center align-items-center">
                                <FileExcelFill size={20}/>
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default OrderItem;