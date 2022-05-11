import {
    CARRIER_ROUTE,
    LOGIN_ROUTE, ORDER_ROUTE,
    PRODUCT_ROUTE,
    REGISTRATION_ROUTE,
    RESET_ROUTE,
    RESET_W_LINK_ROUTE, SUPPLY_ROUTE, USER_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Reset from "./pages/Reset";
import ResetNewPassword from "./pages/ResetNewPassword";
import Reg from "./pages/Reg";
import Main from "./pages/Main";
import AddProduct from "./components/modals/AddProduct";


export const authRoutes =
    [
        {

        }
    ]

export const publicRoutes =
    [
        {
            path: LOGIN_ROUTE,
            Component: Auth
        },
        {
            path: REGISTRATION_ROUTE,
            Component: Reg
        },
        {
            path: RESET_ROUTE,
            Component: Reset
        },
        {
            path: RESET_W_LINK_ROUTE,
            Component: ResetNewPassword
        },
        {
            path: PRODUCT_ROUTE,
            Component: Main
        },
        {
            path: SUPPLY_ROUTE,
            Component: Main
        },
        {
            path: ORDER_ROUTE,
            Component: Main
        },
        {
            path: CARRIER_ROUTE,
            Component: Main
        },
        {
            path: USER_ROUTE,
            Component: Main
        }
    ]