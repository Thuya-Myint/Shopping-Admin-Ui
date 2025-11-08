import React, { useEffect, useState } from 'react'
import { getAllRole } from '../services/role.service'
import LoadingV1 from './LoadingV1'
import { createUser, updateUserRole } from '../services/user.service'
import { toast } from 'react-toastify'
import { IoCloseCircle } from 'react-icons/io5'
const UserModal = ({ isUpdatingUser, setIsAddingUser, setUsers, userData = null, setIsUpdatingUser, isAddingUser }) => {
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

            const response = isAddingUser ?
                await createUser({
                    name: username,
                    password,
                    role: selectedRole
                })
                :
                await updateUserRole(userData?._id, { role: selectedRole })
            if (response.success) {

                console.log("update user", response.data)
                toast.success(response?.message)
                setIsAddingUser(false)
                setIsUpdatingUser(false)
                setSelectedRole(null)
                setUsername("")
                isAddingUser ?
                    setUsers(prev => [...prev, response.data])
                    :
                    setUsers(prev => prev.map(user => user._id === userData._id ? response.data : user))

            }
        } catch (error) {
            console.log("handeCreateUser error()", error)
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center gap-2 bg-black/30 absolute inset-0'>

            <form className='bg-white shadow-lg shadow-black/20 rounded-lg p-4 flex flex-col' onSubmit={(e) => {
                e.preventDefault()
                handleCreateUser()

            }}>
                <h1 className='text-xl font-light mb-4'>{isUpdatingUser ? 'Update' : 'Add'} user</h1>
                <div className='flex gap-2'>
                    <input value={username} disabled={isUpdatingUser} onChange={(e) => setUsername(e.target.value)}
                        type="text" className='border-gray-800 border-2 p-2 outline-0 rounded-lg ' placeholder='username' />
                    {
                        isAddingUser ? <input value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password" className='border-gray-800 border-2 p-2 outline-0 rounded-lg ' placeholder='password' />
                            : ""
                    }
                </div>
                <div className='mt-4 '>

                    <div className='text-xl'>
                        Role
                    </div>
                    {
                        role?.length > 0 ?
                            <div className='grid grid-cols-3 gap-2 mt-2'>
                                {
                                    role?.map((item, index) => (
                                        <div key={index} className={`rounded-lg p-2 cursor-pointer 
                                            ${selectedRole === item?._id ? "bg-blue-400 text-white" : "bg-slate-100/60 "}`}
                                            onClick={() => setSelectedRole(item?._id)}
                                        >{item?.name}</div>
                                    ))
                                }
                            </div> :
                            <LoadingV1 />
                    }
                </div>
                <div className='mt-6 flex justify-end'>
                    <button className='bg-slate-200 px-4 py-2 rounded-lg cursor-pointer'>
                        {isUpdatingUser ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>
            <button className='bg-gradient-to-br from-red-400 to-red-500 shadow-white/50 cursor-pointer shadow-lg p-2 rounded-full text-white '
                onClick={() => {
                    setIsAddingUser(false)
                    setIsUpdatingUser(false)
                    setUsername("")

                }}>

                <IoCloseCircle className='text-xl' />
            </button>
        </div>
    )
}

export default UserModal