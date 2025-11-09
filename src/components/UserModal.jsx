import React, { useEffect, useState } from 'react'
import { getAllRole } from '../services/role.service'
import LoadingV1 from './LoadingV1'
import { createUser, updateUserRole } from '../services/user.service'
import { toast } from 'react-toastify'
import { IoCloseCircle } from 'react-icons/io5'

const UserModal = ({
    isUpdatingUser,
    setIsAddingUser,
    setUsers,
    userData = null,
    setIsUpdatingUser,
    isAddingUser
}) => {

    const [username, setUsername] = useState(userData?.name || "")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState([])
    const [selectedRole, setSelectedRole] = useState(userData?.role?._id)

    useEffect(() => {
        handleFetchRole()
    }, [])

    const handleFetchRole = async () => {
        try {
            const response = await getAllRole()
            if (response.success) {
                setRole(response.data)
            }
        } catch (error) {
            console.log("handleFetchRole() error", error)
        }
    }

    const handleCreateUser = async () => {
        try {
            const response = isAddingUser
                ? await createUser({
                    name: username,
                    password,
                    role: selectedRole
                })
                : await updateUserRole(userData?._id, { role: selectedRole })

            if (response.success) {
                toast.success(response?.message)
                setIsAddingUser(false)
                setIsUpdatingUser(false)
                setSelectedRole(null)
                setUsername("")

                isAddingUser
                    ? setUsers(prev => [...prev, response.data])
                    : setUsers(prev => prev.map(user =>
                        user._id === userData._id ? response.data : user
                    ))
            }

        } catch (error) {
            console.log("handeCreateUser error()", error)
        }
    }

    return (
        <div className='fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm 
                        flex justify-center items-center z-50'>

            {/* MODAL */}
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateUser()
                }}
                className='bg-white rounded-xl shadow-xl shadow-black/20 
                           p-6 flex flex-col animate-fadeIn'
            >
                {/* HEADER */}
                <h1 className='text-2xl font-semibold text-gray-800 mb-5'>
                    {isUpdatingUser ? 'Update User' : 'Add User'}
                </h1>

                {/* INPUTS */}
                <div className='flex gap-3'>
                    <input
                        value={username}
                        disabled={isUpdatingUser}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder='username'
                        className='flex-1 border border-gray-300 rounded-lg px-3 py-2
                                   focus:ring-2 focus:ring-blue-400 outline-none 
                                   transition bg-gray-50'
                    />

                    {isAddingUser && (
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='password'
                            className='flex-1 border border-gray-300 rounded-lg px-3 py-2
                                       focus:ring-2 focus:ring-blue-400 outline-none
                                       transition bg-gray-50'
                        />
                    )}
                </div>

                {/* ROLE SECTION */}
                <div className='mt-6'>
                    <div className='text-gray-700 font-medium text-base mb-2'>Select Role</div>

                    {role?.length > 0 ? (
                        <div className='grid grid-cols-3 gap-2'>
                            {role.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedRole(item?._id)}
                                    className={`cursor-pointer rounded-lg py-2 px-3 text-center
                                        border transition-all
                                        ${selectedRole === item?._id
                                            ? "bg-blue-500 text-white border-blue-500 shadow"
                                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                        }`}
                                >
                                    {item?.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <LoadingV1 />
                    )}
                </div>

                {/* SUBMIT */}
                <div className='mt-8 flex justify-end'>
                    <button
                        type='submit'
                        className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg 
                                   shadow-lg transition active:scale-95'
                    >
                        {isUpdatingUser ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>

            {/* CLOSE BUTTON */}
            <button
                className='absolute top-6 right-6 p-2 rounded-full text-white 
                           bg-gradient-to-br from-red-500 to-red-600 shadow-lg 
                           hover:scale-105 transition'
                onClick={() => {
                    setIsAddingUser(false)
                    setIsUpdatingUser(false)
                    setUsername("")
                }}
            >
                <IoCloseCircle className='text-3xl' />
            </button>
        </div>
    )
}

export default UserModal