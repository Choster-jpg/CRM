import React, {useEffect, useState, useContext} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import {ArrowRightCircle, BookmarkCheckFill, FileExcelFill} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProducts} from "../http/productAPI";


const OrderConfirmItem = observer(({order}) =>
{
    const {supply} = useContext(Context);
    const {product} = useContext(Context);

    useEffect(() => {
        fetchProducts().then(data => product.setProducts(data.rows))
    }, []);

    const product_name = product.products.filter(product => product.id == order.product_id).name;

    const [sup, setSup] = useState(0);

    return (
        <Col md={12}>
            <Card style={{marginLeft: 20, marginRight: 20, marginTop: 20, borderRadius: 10}} className="product-card">
                <Card.Header as="h6">Заказ #{order.id}</Card.Header>
                <Card.Body>
                    <div className="d-flex">
                        <div style={{background:"transparent",width:300, marginTop: 2}}>
                            <Card.Text style={{fontWeight: "bold"}}>{product_name}</Card.Text>
                        </div>
                        <div style={{background:"transparent", width:100, paddingLeft: 30, marginTop: 2}}>
                            <Card.Title>{order.amount}</Card.Title>
                        </div>
                        <div style={{background:"transparent", width:200, paddingLeft: 30, marginTop: 2}}>
                            <Form.Select required type="text" className="form-control" value={sup} onChange={(e) => setSup(+e.target.value)}>
                                {
                                    supply.supplies.map(supply =>
                                        <option key={supply.id}>{supply.id}</option>
                                    )
                                }
                            </Form.Select>
                        </div>
                        <div style={{background:"transparent", width: 100, paddingLeft: 20, marginTop: 2}}>
                            <Button variant="outline-success" style={{width: 50, height: 30, marginTop: -1}}
                                    className="d-flex justify-content-center align-items-center"
                                    >
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