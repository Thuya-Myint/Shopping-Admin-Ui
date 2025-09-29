import CreateUser from "../pages/CreateUser"
import Category from "../pages/Category"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Order from "../pages/Order"
import Product from "../pages/Product"
import Unit from "../pages/Unit"
import MainLayout from "../layouts/MainLayout"
import { Navigate } from "react-router-dom"


import { MdDashboard, MdPersonAdd, MdCategory, MdStraighten, MdInventory, MdShoppingCart, MdSettings } from "react-icons/md";
import UserSetting from "../pages/Setting"

export const sideBarItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
    },
    {
        name: "Create User",
        path: "/create-user",
        icon: <MdPersonAdd />,
    },
    {
        name: "Category",
        path: "/category",
        icon: <MdCategory />,
    },
    {
        name: "Unit",
        path: "/unit",
        icon: <MdStraighten />, // "Unit" → measurement icon
    },
    {
        name: "Product",
        path: "/product",
        icon: <MdInventory />,
    },
    {
        name: "Order",
        path: "/order",
        icon: <MdShoppingCart />,
    },
    {
        name: "Setting",
        path: "/setting",
        icon: <MdSettings />,
    },

];
export const routes = [
    {
        name: "Login",
        path: "/login",
        element: <Login />
    },
    {
        name: "Main",
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" />
            },
            {
                name: "Dashboard",
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                name: "Create User",
                path: "/create-user",
                element: <CreateUser />
            },
            {
                name: "Category",
                path: "/category",
                element: <Category />
            },
            {
                name: "Unit",
                path: "/unit",
                element: <Unit />
            },
            {
                name: "Product",
                path: "/product",
                element: <Product />
            },
            {
                name: "Order",
                path: "/order",
                element: <Order />
            },
            {
                name: "Setting",
                path: "/setting",
                element: <UserSetting />
            },
        ]
    }
]