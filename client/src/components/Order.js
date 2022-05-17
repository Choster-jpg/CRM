import React, {useContext, useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import OrderItem from "./OrderItem";
import {fetchSupply} from "../http/supplyAPI";
import {fetchOrders} from "../http/orderAPI";
import {fetchProducts} from "../http/productAPI";
import {fetchUsers} from "../http/userAPI";

const Order = observer(() =>
{
    const {orders} = useContext(Context);
    const {product} = useContext(Context);
    const {supply} = useContext(Context);
    const {user} = useContext(Context);

    let product_name; let tmp_user; let display_name; let supply_date;


    useEffect(() => {
            console.log('sex')
            fetchSupply(null, null, null, 100, 1).then(data => supply.setSupplies(data.rows));
            fetchOrders().then(data => orders.setOrders(data.rows));
            fetchProducts(null, null, null, 100, 1).then(data => product.setProducts(data.rows));
            fetchUsers().then(data => user.setUsers(data.rows));
    }, [])

    return (
        <Card className="div-main-content-container">
            <div className="div-headers-carriers">
                <div className="d-flex flex-row">
                    <span className="span-titles-carriers-page" style={{marginLeft: 15}}>Заказчик</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 288}}>Товар</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 410}}>Количество</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 100}}>Дата поставки</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 103}}>Утвержден</span>

                    <span className="span-titles-carriers-page" style={{marginLeft: 130}}>Опции</span>
                </div>
                <hr className="divider-form-sort" style={{marginTop: 5}}/>
            </div>

            <Row className="d-flex">
                {
                    orders.orders.map(order =>
                        {
                            console.log(product.products);
                            console.log(supply.supplies);

                            product_name = product.products.filter(product => product.id == order.product_id)[0].name;
                            tmp_user = user.users.filter(user => user.id == order.user_id)[0];
                            display_name = tmp_user.name + ' ' + tmp_user.last_name;
                            supply_date = supply.supplies.filter(supply => supply.id == order.supply_id)[0].date;

                            return <OrderItem key={order.id}
                                              order={order} display_name={display_name}
                                              product_name={product_name} supply_date={supply_date}/>
                        }
                    )
                }
            </Row>
        </Card>
    );
});

export default Order;