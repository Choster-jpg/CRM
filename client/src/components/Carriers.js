import React, {createContext, useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Container, Form, FormGroup, InputGroup, Row} from "react-bootstrap";
import CarrierItem from "./CarrierItem";
import {fetchCarrier, removeCarrier} from "../http/carrierAPI";

const Carriers = observer(() =>
{
    const {carrier} = useContext(Context);

    useEffect(() => {
        fetchCarrier().then(data => carrier.setCarriers(data.rows))
    }, [])

    return (
        <Card className="div-main-content-container">
            <div className="div-headers-carriers">
                <div className="d-flex flex-row">
                    <span className="span-titles-carriers-page" style={{marginLeft: 15}}>Наименование перевозчика</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 380}}>Местонахождение</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 270}}>Занят/свободен</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 260}}>Опции</span>
                </div>
                <hr className="divider-form-sort" style={{marginTop: 5}}/>
            </div>

            <Row className="d-flex">
                {
                    carrier.carriers.map(carrier =>
                        <CarrierItem key={carrier.id} carrier={carrier}
                                     removeItem={() => removeCarrier(carrier.id)}/>
                    )
                }
            </Row>
        </Card>
    );
});

export default Carriers;