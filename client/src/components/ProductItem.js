import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import {ArrowDownUp, CartPlusFill, CheckCircle, TrashFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import {incrementProduct, updateProduct} from "../http/productAPI";

const ProductItem = observer(({product, removeItem}) => {
    let counter = 0;

    const [buttonChangeDisplay, setButtonChangeDisplay] = useState("initial");
    const [buttonConfirmDisplay, setButtonConfirmDisplay] = useState("none");

    const [isDisabled, setIsDisabled] = useState(true);

    const [productAmount, setProductAmount] = useState(0);
    const [productPrice, setProductPrice] = useState(0);

    useEffect(() =>
    {
        setProductAmount(product.amount);
        setProductPrice(product.price);
    }, [])

    const onClick = () =>
    {
        if (counter % 2 == 0)
        {
            setButtonChangeDisplay("none");
            setButtonConfirmDisplay("initial");
            setIsDisabled(false);
        }
        else
        {
            setButtonChangeDisplay("initial");
            setButtonConfirmDisplay("none");
            setIsDisabled(true);

            incrementProduct(product.id, productAmount).then(data => console.log(data));
            updateProduct(product.id, productPrice).then(data => console.log(data));
        }
        counter++;
    }

    const onPlusClick = () =>
    {
        incrementProduct(product.id, 1).then(data => console.log(data));
    }

    const onAmountChange = (e) =>
    {
        setProductAmount(+e.target.value);
    };

    const onPriceChange = (e) =>
    {
        setProductPrice(+e.target.value);
    };

    return (
        <Col md={4}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 40, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">{product.name}</Card.Header>
                <Card.Body>
                    <Form>
                        <Card.Title>В наличии: </Card.Title>
                        <InputGroup className="product-card-amount-input-group">
                            <Form.Control disabled={isDisabled} type="text"
                                          className="form-control"
                                          value={productAmount}
                                          onChange={(e) => onAmountChange(e)}/>
                            <InputGroup.Text>шт.</InputGroup.Text>
                            <Button variant="outline-success" style={{marginLeft: 20}} onClick={onPlusClick}>+</Button>
                        </InputGroup>
                        <FormGroup style={{marginTop: 15}} className="product-card-price-form-group">
                            <Form.Label className="form-label">Цена за 1 шт. :</Form.Label>
                            <InputGroup>
                                <Form.Control disabled={isDisabled} type="text"
                                              className="form-control"
                                              value={productPrice}
                                              onChange={(e) => onPriceChange(e)} />
                                <InputGroup.Text>.00 $</InputGroup.Text>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup style={{marginTop: 15}}>
                            <Button style={{display: `${buttonChangeDisplay}`}} variant="outline-warning" onClick={onClick}>
                                <ArrowDownUp/>
                            </Button>
                            <Button style={{display: `${buttonConfirmDisplay}`}} variant="outline-success" onClick={onClick}>
                                <CheckCircle/>
                            </Button>
                            <Button variant="outline-danger" style={{marginLeft: 10}} onClick={() => removeItem()}>
                                <TrashFill/>
                            </Button>
                        </FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
});

export default ProductItem;