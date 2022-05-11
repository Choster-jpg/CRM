import React from 'react';
import {Button, Card, Col, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {ArrowDownUp, CartPlusFill, DashCircleFill, EnvelopeX, TrashFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import StatusBox from "./StatusBox";

const CarrierItem = observer(({carrier}) =>
{
    return (
        <Col md={12}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 40, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">Перевозчик #{carrier.id}</Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div style={{width: 590, paddingTop: 12}}>
                            <Card.Title>{carrier.name}</Card.Title>
                        </div>
                        <div style={{width: 300, paddingTop: 12}}>
                            <Card.Text style={{marginTop: 0, marginLeft: 20}} className="span-carrier-city">{carrier.city}</Card.Text>
                        </div>
                        <div style={{width: 340, paddingLeft: 160, paddingTop: 15}}>
                            <StatusBox status={carrier.is_busy}/>
                        </div>
                        <div style={{width: 320}}>
                            <Button variant="outline-danger" style={{width: 200, height: 50, marginLeft: 80}}><EnvelopeX size={30}/></Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default CarrierItem;