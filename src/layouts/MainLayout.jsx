import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../helpers/helper";
import { sideBarItems } from "../config/routes"; // fixed to singular (your code had sideBarItems vs sideBarItem)
import logo from '../assets/images/logo2.png'
import { STORAGE_KEYS } from "../config/config";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
// import { myTheme } from "../config/config";


const MainLayout = () => {

    const userData = getItemFromLocalStorage(STORAGE_KEYS.USER_DATA);
    const allowedRoutes = userData?.role?.allowedPaths || [];


    const { logout } = useUser()

    // const colorTheme = myTheme[currentApperance]
    const allowedSideBarItems = sideBarItems.filter((item) =>
        allowedRoutes.includes(item.path)
    );
    const location = useLocation()
    const currentPaths = location.pathname
    const currentTitle = sideBarItems.find(item => item.path === currentPaths).name
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className={`w-60  bg-gray-800 text-white flex flex-col p-4`}>
                <h2 className="text-lg font-bold mb-6"><img src={logo} alt="Shomyn logo" className='w-28 h-16 rounded-2xl'
                /></h2>
                <nav className="flex flex-col gap-2">
                    {allowedSideBarItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setItemToLocalStorage(STORAGE_KEYS.CLICKED_TAB, item.path)}
                            className={({ isActive }) =>
                                `flex items-center gap-2 p-2 rounded-md transition-colors ${isActive ? "bg-blue-500" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            {item.icon && <span className="text-xl">{item.icon}</span>}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
                <button className="bg-red-500 text-white mt-10 p-2 rounded-md"
                    onClick={logout}
                >Log Out</button>
            </aside>

            {/* Main content */}
            <main className="flex-1  overflow-auto">
                <div className=" bg-gray-100 px-4 py-2 flex justify-between items-center ">
                    <div className="text-lg">
                        {currentTitle}
                    </div>


                    <Link className="flex transition-all duration-150 items-center gap-2 bg-gradient-to-br cursor-pointer active:opacity-40 from-blue-400 text-white to-indigo-600 p-2 px-4 rounded-xl"
                        to={"/setting"}
                    >
                        <img src={userData.imageUrl} alt="" className="w-10 h-10 rounded-full" />
                        {userData.name}
                    </Link>


                </div>
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;