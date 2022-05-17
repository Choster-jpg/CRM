import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ProductItem from "./ProductItem";
import {Card, Col, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import {fetchProducts, removeProduct} from "../http/productAPI";
import PaginationProduct from "./PaginationProduct";


const Products = observer (() =>
{
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [name, setName] = useState(null);

    const {product} = useContext(Context);

    useEffect(() => {
        fetchProducts().then(data =>
        {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, []);



    useEffect(() => {
        fetchProducts(minPrice, maxPrice, name, product.limit, product.page).then(data =>
        {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        });
    }, [product.page, maxPrice, minPrice, name])

    const onMinPriceChange = (e) =>
    {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))
        {
            if(e.target.value == '')
                setMinPrice(null);
            else
                setMinPrice(e.target.value);
        }
    };

    const onMaxPriceChange = (e) =>
    {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))
        {
            if(e.target.value == '')
                setMaxPrice(null);
            else
                setMaxPrice(e.target.value);
        }
    };

    const onNameChange = (e) =>
    {
        if(e.target.value == '')
            setName(null);
        else
            setName(e.target.value);
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
                                <Form.Control required type="text" className="form-control" value={name} onChange={onNameChange}/>
                            </InputGroup>
                        </FormGroup>
                    </Row>
                </Form>
                <hr className="divider-form-sort"/>
            </div>

            <Row className="d-flex">
                {
                    product.products.map(product =>
                        <ProductItem key={product.id}
                                     product={product}
                                     removeItem={() => removeProduct(product.id)}/>
                    )
                }
            </Row>

            <div style={{marginLeft: 1440, marginTop:750, position: "absolute"}}>
                <PaginationProduct />
            </div>

        </Card>
    );
});

export default Products;