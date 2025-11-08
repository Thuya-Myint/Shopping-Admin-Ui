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
        <div className='w-screen h-screen flex justify-center items-center bg-black/30 fixed inset-0' onClick={() => setIsManagingRole(prev => !prev)}>
            <div className='bg-white max-h-96 overflow-auto shadow-lg shadow-black/20 rounded-lg p-4 flex flex-col' onClick={(e) => e.stopPropagation()}>
                <h1 className='text-xl'>All Role</h1>
                <div className='grid grid-cols-2 gap-2'>
                    {
                        allRole.map(role => (
                            <div key={role?.name} className='bg-slate-100 p-2 rounded-xl mt-2'>
                                <div className='flex items-center justify-between'>
                                    <div>{role?.name}</div>
                                    <button
                                        className='cursor-pointer bg-blue-400 text-white p-1 rounded-full active:bg-blue-200'
                                        onClick={() => {
                                            setDataToUpdate(role)
                                            setIsUpdatingRole(true)
                                            setIsManagingRole(false)
                                        }}>
                                        <FaPencil className='text-sm' />
                                    </button>
                                </div>
                                <div className='grid grid-cols-3 gap-1  mt-2'>
                                    {
                                        role?.allowedPaths?.map(item => (
                                            <div key={item} className=' border-2 border-white p-2 rounded-lg bg-slate-50  text-sm'>
                                                {item.slice(1, item.length)}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default ManageRoleModal