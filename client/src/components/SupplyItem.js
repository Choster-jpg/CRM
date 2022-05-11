import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import StatusBox from "./StatusBox";
import {ArrowRightCircle, FileExcelFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";

const SupplyItem = observer( ({supply}) =>
{
    return (
        <Col md={12}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">Поставка #{supply.id}</Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div style={{background:"transparent",width:100, marginTop: 2}}>
                            <Card.Title>{supply.address_from}</Card.Title>
                        </div>
                        <div style={{background:"transparent", width:60, paddingLeft: 30, marginTop: 2}}>
                            <ArrowRightCircle  size="22"/>
                        </div>
                        <div style={{background:"transparent", width:200, paddingLeft: 30, marginTop: 2}}>
                            <Card.Title style={{marginLeft: 30}}>{supply.address_to}</Card.Title>
                        </div>
                        <div style={{background:"transparent", width:200, paddingLeft: 30, marginTop: 2}}>
                            <Card.Title style={{marginLeft: 30}}>{supply.date}</Card.Title>
                        </div>
                        <div style={{background:"transparent", width:200, paddingLeft: 30, marginTop: 2}}>
                            <Card.Text style={{marginLeft: 30, fontSize: 16, fontWeight: "bold"}}>Перевозчик #{supply.carrier_id}</Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default SupplyItem;