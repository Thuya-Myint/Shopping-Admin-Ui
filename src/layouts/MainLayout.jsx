import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../helpers/helper";
import { sideBarItems } from "../config/routes"; // fixed to singular (your code had sideBarItems vs sideBarItem)
import { STORAGE_KEYS } from "../config/config";

const MainLayout = () => {
    const userData = getItemFromLocalStorage(STORAGE_KEYS.USER_DATA);
    const allowedRoutes = userData?.allowedPaths || [];

    const allowedSideBarItems = sideBarItems.filter((item) =>
        allowedRoutes.includes(item.path)
    );

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-60 bg-gray-800 text-white flex flex-col p-4">
                <h2 className="text-lg font-bold mb-6">Shopping Admin Ui</h2>
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
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;