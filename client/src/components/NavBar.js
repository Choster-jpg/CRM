import React, {useContext} from 'react';
import '../pages/css/reg.css';
import Logo from "./Logo";
import {Nav, NavDropdown} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const NavBar = () =>
{
    const {user} = useContext(Context);

    const navigate = useNavigate();

    const Logout = () =>
    {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }

    return (
        <div className="nav-bar">
            <Logo/>
            <div className="nav-avatar">
            </div>
            <Nav>
                <NavDropdown title="ChosterUser" className="user-options-dropdown" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Профиль</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4" onClick={Logout}>Выйти</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </div>
    );
};

export default NavBar;