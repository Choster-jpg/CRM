import React from 'react';
import {Button, Card, Col, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import {ArrowDownUp, CartPlusFill, TrashFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";

const ProductItem = observer(({product}) =>
{
    return (
        <Col md={4}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 40, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">{product.name}</Card.Header>
                <Card.Body>
                    <Form>
                        <Card.Title>В наличии: </Card.Title>
                        <InputGroup className="product-card-amount-input-group">
                            <Form.Control disabled type="text" className="form-control" value={product.amount}/>
                            <InputGroup.Text>шт.</InputGroup.Text>
                            <Button variant="outline-success" style={{marginLeft: 20}}>+</Button>
                        </InputGroup>
                        <FormGroup style={{marginTop: 15}} className="product-card-price-form-group">
                            <Form.Label className="form-label">Цена за 1 шт. :</Form.Label>
                            <InputGroup>
                                <Form.Control disabled type="text" className="form-control" value={product.price}/>
                                <InputGroup.Text>.00 $</InputGroup.Text>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup style={{marginTop: 15}}>
                            <Button variant="outline-warning" >
                                <ArrowDownUp/>
                            </Button>
                            <Button variant="outline-danger" style={{marginLeft: 10}}>
                                <TrashFill/>
                            </Button>
                            <Button variant="outline-success" style={{marginLeft: 10}}>
                                <CartPlusFill/>
                            </Button>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default ProductItem;