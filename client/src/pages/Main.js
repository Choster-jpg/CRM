import React, {useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useLocation, useNavigate} from "react-router-dom";
import Products from "../components/Products";
import AddProduct from "../components/modals/AddProduct";
import Carriers from "../components/Carriers";
import Order from "../components/Order";
import Supply from "../components/Supply";

const Main = () =>
{
    const history = useNavigate();

    let content;
    const location = useLocation();
    console.log(location.pathname);

    switch (location.pathname)
    {
        case "/api/product":
            content = <Products/>;
            break;

        case "/api/carrier":
            content = <Carriers/>;
            break;

        case "/api/supply":
            content = <Supply/>;
            break;

        case "/api/order":
            content = <Order/>;
            break;

        case "/api/user":
            content = <div>Users</div>;
            break;
    }

    return (
        <div className="d-flex">
            <SideBar/>
            {content}
            <NavBar/>
        </div>
    );
};

export default Main;