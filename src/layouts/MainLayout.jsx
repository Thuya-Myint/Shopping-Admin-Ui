import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { setItemToLocalStorage } from '../helpers/helper'

const MainLayout = () => {
    return (
        <div>
            //nav bar
            <div className='flex gap-10'>
                <NavLink
                    onClick={() => setItemToLocalStorage("clickTab", "/dashboard")}
                    to="/dashboard">
                    Dashboard
                </NavLink>
                <NavLink
                    onClick={() => setItemToLocalStorage("clickTab", "/category")}
                    to="/category">
                    Category
                </NavLink>
                <NavLink
                    onClick={() => setItemToLocalStorage("clickTab", "/create-user")}
                    to="/create-user">
                    Create User
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout