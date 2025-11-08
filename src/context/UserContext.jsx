import { createContext, useContext, useState, useEffect } from "react";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemToLocalStorage } from "../helpers/helper";
import { STORAGE_KEYS } from "../config/config";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const storedData = getItemFromLocalStorage(STORAGE_KEYS.USER_DATA)
        setUserData(storedData)
    }, [])

    const changeUserData = () => {
        logout()

    }
    // useEffect(() => {
    //     // console.log("userdata ", userData)
    // }), [userData]

    const logout = () => {
        removeItemFromLocalStorage()
        setUserData(null)
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, changeUserData, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)