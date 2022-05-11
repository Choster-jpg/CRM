import React, {useState} from 'react';
import * as PropTypes from "prop-types";
import {Boxes, Briefcase, BriefcaseFill, Cart2, PeopleFill, Recycle} from "react-bootstrap-icons";
import AddProduct from "./modals/AddProduct";
import AddCarrier from "./modals/AddCarrier";
import AddSupply from "./modals/AddSupply";
import AddOrder from "./modals/AddOrder";

function FontAwesomeIcon(props) {
    return null;
}

FontAwesomeIcon.propTypes = {icon: PropTypes.string};
const SideBar = () =>
{
    const [selectedObject, setSelectedObject] = useState('');

    const OnDivClick = (e) =>
    {
        if(selectedObject != '')
        {
            document.getElementById(selectedObject).style.background = 'transparent';
        }
        document.getElementById(e.target.id).style.background = '#e4f4e4';
        setSelectedObject(e.target.id);
    }

    const OnDivMouseOver = (e) =>
    {
        document.getElement(e.target).style.background = '#e7eeec';
    }

    const OnOrderClick = (e) =>
    {
        OnDivClick(e);

    }

    const OnSupplyClick = (e) =>
    {
        OnDivClick(e);

    }

    const OnCarrierClick = (e) =>
    {
        OnDivClick(e);

    }

    const OnProductClick = (e) =>
    {
        OnDivClick(e);

    }

    const OnUserClick = (e) =>
    {
        OnDivClick(e);

    }

    const [productVisible, setProductVisible] = useState(false);
    const [carrierVisible, setCarrierVisible] = useState(false);
    const [orderVisible, setOrderVisible] = useState(false);
    const [supplyVisible, setSupplyVisible] = useState(false);

    return (
        <div className="sidebar-container">
            <div className="div-section-orders">
                <div className="div-section-sidebar-header">
                    <Cart2 size={22} color="#00684a" className="icon-section-sidebar-header"/>
                    <span className="span-section-sidebar-header">
                        ЗАКАЗЫ
                    </span>
                </div>
                <div className="list-group">
                    <div className="list-group-item-div" id="myOrders"
                         onClick={(e) => OnOrderClick(e)}
                         onMouseOver={(e) => OnDivMouseOver(e)}>
                        <span className="list-group-item-span">Мои заказы</span>
                    </div>
                    <div className="list-group-item-div" onClick={() => setOrderVisible(true)}><span className="list-group-item-span">Сделать заказ</span></div>
                    <div className="list-group-item-div"><span className="list-group-item-span">На подтверждение</span></div>
                </div>
            </div>

            <div className="div-section-products">
                <div className="div-section-sidebar-header">
                    <Boxes size={22} color="#00684a" className="icon-section-sidebar-header"/>
                    <span className="span-section-sidebar-header">
                        ТОВАРЫ
                    </span>
                </div>
                <div className="list-group">
                    <div className="list-group-item-div" id="myProducts"
                         onClick={(e) => OnProductClick(e)}
                         onMouseOver={(e) => OnDivMouseOver(e)}>
                        <span className="list-group-item-span">Все товары</span>
                    </div>
                    <div className="list-group-item-div" onClick={() => setProductVisible(true)}><span className="list-group-item-span">Добавить товар</span></div>
                </div>
            </div>

            <div className="div-section-supplies">
                <div className="div-section-sidebar-header">
                    <Recycle size={22} color="#00684a" className="icon-section-sidebar-header"/>
                    <span className="span-section-sidebar-header">
                        ПОСТАВКИ
                    </span>
                </div>
                <div className="list-group">
                    <div className="list-group-item-div" id="mySupplies"
                         onClick={(e) => OnSupplyClick(e)}
                         onMouseOver={(e) => OnDivMouseOver(e)}>
                        <span className="list-group-item-span">Отслеживать</span>
                    </div>
                    <div className="list-group-item-div" onClick={() => setSupplyVisible(true)}><span className="list-group-item-span">Добавить поставку</span></div>
                </div>
            </div>

            <div className="div-section-carriers">
                <div className="div-section-sidebar-header">
                    <BriefcaseFill size={22} color="#00684a" className="icon-section-sidebar-header"/>
                    <span className="span-section-sidebar-header">
                        ПЕРЕВОЗЧИКИ
                    </span>
                </div>
                <div className="list-group">
                    <div className="list-group-item-div" id="myCarriers"
                         onClick={(e) => OnCarrierClick(e)}
                         onMouseOver={(e) => OnDivMouseOver(e)}>
                        <span className="list-group-item-span">Все перевозчики</span>
                    </div>
                    <div className="list-group-item-div" onClick={() => setCarrierVisible(true)}><span className="list-group-item-span">Нанять</span></div>
                </div>
            </div>

            <div className="div-section-users">
                <div className="div-section-sidebar-header">
                    <PeopleFill size={22} color="#00684a" className="icon-section-sidebar-header"/>
                    <span className="span-section-sidebar-header">
                        ЮЗЕРЫ
                    </span>
                </div>
                <div className="list-group">
                    <div className="list-group-item-div" id="myUsers"
                         onClick={(e) => OnUserClick(e)}
                         onMouseOver={(e) => OnDivMouseOver(e)}>
                        <span className="list-group-item-span">Все пользователи</span>
                    </div>
                </div>
            </div>

            <AddProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <AddCarrier show={carrierVisible} onHide={() => setCarrierVisible(false)}/>
            <AddSupply  show={supplyVisible} onHide={() => setSupplyVisible(false)}/>
            <AddOrder   show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </div>
    );
};

export default SideBar;