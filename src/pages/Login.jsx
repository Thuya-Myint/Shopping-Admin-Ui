import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setItemToLocalStorage } from '../helpers/helper'
import { User, Lock } from 'lucide-react'
import { API_ROUTES, STORAGE_KEYS } from '../config/config'
import axiosInstance from '../config/axiosInstance'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setUserData } = useUser()


    const handleSubmit = async () => {

        console.log("login ")
        setError("")
        setLoading(true)
        try {
            const response = await axiosInstance.post(API_ROUTES.USER_LOGIN, {
                name: username,
                password,
            })
            // console.log("response user login", response.data.message)

            if (response.data.success) {
                toast.success(response.data.message)
                const allowedPaths = response.data.data.allowedPaths
                // console.log("allowed paths", allowedPaths)

                setUserData(response.data.data)
                setItemToLocalStorage(STORAGE_KEYS.USER_DATA, response.data.data)
                setItemToLocalStorage(STORAGE_KEYS.TOKEN, response.data.token)

                navigate("/dashboard")
                // window.location.reload()

            } else {
                setError("Invalid credentials, please try again.")
            }
        } catch (error) {

            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen min-h-screen flex">
            {/* Left side */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-8">
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
                    <p className="text-lg opacity-90">
                        Sign in to access your dashboard and manage your account.
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-50 p-8">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-2xl">L</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign In</h2>
                    <p className="text-center text-gray-500 mb-6 text-sm">Enter your credentials below</p>

                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                    >
                        {/* Username */}
                        <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400">
                            <User className="text-gray-400" size={18} />
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                placeholder="Username"
                                className="w-full focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400">
                            <Lock className="text-gray-400" size={18} />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="w-full focus:outline-none"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 rounded-lg shadow transition duration-200"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login