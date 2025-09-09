import React, { useEffect, useState, useMemo } from 'react'
import { getItemFromLocalStorage, setItemToLocalStorage } from './helpers/helper'
import { STORAGE_KEYS } from "./config/config"
import { routes } from './config/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'

const AppContent = () => {
  const { userData } = useUser()

  // useEffect(() => {
  //   const storedUserData = getItemFromLocalStorage(STORAGE_KEYS.USER_DATA)
  //   setUserData(storedUserData)
  // }, [])
  const router = useMemo(() => {
    // if (!userData) return
    const allowedUserRoutes = userData?.allowedPaths || ["/login"]
    const storedTabs = getItemFromLocalStorage(STORAGE_KEYS.CLICKED_TAB)
    console.log("route", allowedUserRoutes)
    const filteredRoutes = routes.map((route) => {
      if (route.children) {
        const allowedChildren = route.children.filter(child => allowedUserRoutes?.includes(child.path))
        if (allowedChildren?.length === 0) return null
        return {
          ...route,
          children: allowedChildren
        }
      }
      return allowedUserRoutes?.includes(route.path) ? route : null
    }).filter(Boolean)

    filteredRoutes.push({
      path: "*",
      element: userData ? <Navigate to={storedTabs ? storedTabs : filteredRoutes[0]?.children?.[0].path} /> : <Navigate to="/login" />
    })

    console.log("allowed routes ", filteredRoutes)
    return createBrowserRouter(filteredRoutes)

  }, [userData])


  return <>
    <RouterProvider router={router} />
  </>
}

const App = () => (
  <UserProvider>
    <AppContent />
  </UserProvider>
)

export default App