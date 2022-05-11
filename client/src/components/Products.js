import React, {createContext, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ProductItem from "./ProductItem";
import {Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import {fetchProducts} from "../http/productAPI";


const Products = observer (() =>
{
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [name, setName] = useState('');

    const {product} = useContext(Context);

    useEffect(() => {
        fetchProducts().then(data => product.setProducts(data.rows))
    }, [])

    const onMinPriceChange = (e) =>
    {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))
        {
            setMinPrice(e.target.value);
        }
    };

    const onMaxPriceChange = (e) =>
    {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))
        {
            setMaxPrice(e.target.value);
        }
    };

    return (
        <Card className="div-main-content-container">
            <div className="div-sorting-options">
                <Form>
                    <Row className="col-md-9">
                        <FormGroup as={Col} className="col-2">
                            <Form.Label column className="form-label">Цена, от</Form.Label>
                            <InputGroup className="filter-product-input-sizing">
                                <Form.Control required type="text" className="form-control" value={minPrice} onChange={onMinPriceChange}/>
                                <InputGroup.Text>.00 $</InputGroup.Text>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup as={Col} className="col-2">
                            <Form.Label column className="form-label">Цена, до</Form.Label>
                            <InputGroup className="filter-product-input-sizing">
                                <Form.Control required type="text" className="form-control" value={maxPrice} onChange={onMaxPriceChange}/>
                                <InputGroup.Text>.00 $</InputGroup.Text>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup as={Col} className="col-2">
                            <Form.Label column className="form-label">Название</Form.Label>
                            <InputGroup className="filter-product-input-sizing">
                                <Form.Control required type="text" className="form-control" onChange={e => setName(e.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                    </Row>
                </Form>
                <hr className="divider-form-sort"/>
            </div>

            <Row className="d-flex">
                {
                    product.products.map(product =>
                        <ProductItem key={product.id} product={product}/>
                    )
                }
            </Row>
        </Card>
    );
});

export default Products;