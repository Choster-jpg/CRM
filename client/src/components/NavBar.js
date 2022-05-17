import React, {useContext, useState} from 'react';
import '../pages/css/reg.css';
import Logo from "./Logo";
import {Nav, NavDropdown} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import jwtDecode from "jwt-decode";
import AddUserinfo from "./modals/AddUserinfo";

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

    const token = localStorage.getItem("token");
    const user_info = jwtDecode(token);

    const [userinfoVisible, setUserinfoVisible] = useState(false);


    const onClick = () =>
    {
        setUserinfoVisible(true);
    }

    return (
        <div className="nav-bar">
            <Logo/>
            <div className="nav-avatar">
            </div>
            <Nav>
                <NavDropdown title={user_info.name} className="user-options-dropdown" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1" onClick={onClick}>Профиль</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4" onClick={Logout}>Выйти</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <AddUserinfo show={userinfoVisible} onHide={() => setUserinfoVisible(false)} />
        </div>
    );
};

export default NavBar;