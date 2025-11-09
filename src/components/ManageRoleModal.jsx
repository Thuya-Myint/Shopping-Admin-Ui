import React, { useEffect, useState } from 'react'
import { getAllRole } from '../services/role.service'
import { FaPencil } from 'react-icons/fa6'

const ManageRoleModal = (props) => {
    const { setIsManagingRole, setDataToUpdate, setIsUpdatingRole } = props
    const [allRole, setAllRole] = useState([])

    useEffect(() => {
        handleGetAllRole()
    }, [])

    const handleGetAllRole = async () => {
        try {
            const response = await getAllRole()
            if (response.success) {
                setAllRole(response.data)
            }
        } catch (error) {
            console.log("handleGetAllRole() error ", error)
        }
    }

    return (
        <div
            className='fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm 
                       flex justify-center items-center z-50'
            onClick={() => setIsManagingRole(prev => !prev)}
        >

            <div
                className='bg-white w-full max-w-lg max-h-[80vh] overflow-auto p-6 
                           rounded-xl shadow-xl shadow-black/20'
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <h1 className='text-2xl font-semibold text-gray-800 mb-5'>
                    All Roles
                </h1>

                {/* ROLE LIST */}
                <div className='grid grid-cols-1 gap-4'>
                    {allRole.map(role => (
                        <div
                            key={role?.name}
                            className='bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm'
                        >
                            {/* NAME + EDIT */}
                            <div className='flex items-center justify-between'>
                                <div className='text-lg font-medium text-gray-800'>
                                    {role?.name}
                                </div>

                                <button
                                    className='bg-blue-500 text-white p-2 rounded-full shadow 
                                               hover:bg-blue-600 transition active:scale-95'
                                    onClick={() => {
                                        setDataToUpdate(role)
                                        setIsUpdatingRole(true)
                                        setIsManagingRole(false)
                                    }}
                                >
                                    <FaPencil className='text-sm' />
                                </button>
                            </div>

                            {/* PERMISSIONS */}
                            <div className='grid grid-cols-3 gap-2 mt-3'>
                                {role?.allowedPaths?.map(item => (
                                    <div
                                        key={item}
                                        className='text-sm bg-white border border-gray-300 
                                                   rounded-md p-2 text-center shadow-sm'
                                    >
                                        {item.replace("/", "")}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default ManageRoleModal