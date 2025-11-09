import React, { useEffect, useState } from 'react'
import { sideBarItems } from '../config/routes'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createRole, updateRole } from '../services/role.service';
import { toast } from 'react-toastify';

const RoleModal = (props) => {
    const { setIsAddingRole, dataToUpdate, isUpdatingRole, setIsUpdatingRole, setDataToUpdate } = props

    const [allowedPaths, setAllowedPaths] = useState(dataToUpdate?.allowedPaths || [])
    const [name, setName] = useState(dataToUpdate?.name || "")
    const [description, setDescription] = useState(dataToUpdate?.description || "")

    const handleSelectPaths = (path) => {
        if (allowedPaths.includes(path)) {
            setAllowedPaths(allowedPaths.filter(item => item !== path))
        } else {
            setAllowedPaths([...allowedPaths, path])
        }
    }

    const clearInput = () => {
        setIsUpdatingRole(false)
        setIsAddingRole(false)
        setAllowedPaths([])
        setName("")
        setDescription("")
        setDataToUpdate(null)
    }

    const handleCreateUpdateRole = async () => {
        if (!name || allowedPaths.length === 0) {
            return toast.warn("Invalid input");
        }
        try {
            const commonPayload = {
                name,
                description: description || "",
                allowedPaths
            };

            const finalFn = isUpdatingRole
                ? await updateRole({ ...commonPayload, id: dataToUpdate._id })
                : await createRole(commonPayload);

            const response = await finalFn;

            if (response?.success) {
                toast.success(response.message);
                clearInput();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            className='fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm 
                       flex justify-center items-center z-50'
            onClick={() => setIsAddingRole(false)}
        >

            {/* MODAL */}
            <div
                className='bg-white rounded-xl shadow-xl shadow-black/20 p-6 w-full max-w-md'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >

                {/* HEADER */}
                <h1 className='text-2xl font-semibold text-gray-800 mb-5'>
                    {isUpdatingRole
                        ? `Update permission for ${dataToUpdate?.name}`
                        : 'Create New Role'}
                </h1>

                {/* INPUTS */}
                <div className='flex flex-wrap gap-3 w-full'>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='role name'
                        className='flex-1 min-w-[45%] border border-gray-300 rounded-lg px-3 py-2
                                   bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none'
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='role description'
                        className='flex-1 min-w-[45%] border border-gray-300 rounded-lg px-3 py-2
                                   bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none'
                    />

                </div>

                {/* PERMISSION SECTION */}
                <h1 className='text-lg font-medium text-gray-700 mt-6 mb-2'>
                    Permit Page
                </h1>

                <div className='grid grid-cols-3 gap-3'>
                    {sideBarItems.map(item => (
                        <div
                            key={item.path}
                            onClick={() => handleSelectPaths(item.path)}
                            className={`
                                rounded-lg p-2 cursor-pointer text-center text-sm transition
                                border shadow-sm
                                ${allowedPaths.includes(item.path)
                                    ? "bg-blue-500 text-white border-blue-500 shadow"
                                    : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                                }
                            `}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                {/* FOOTER BUTTONS */}
                <div className='mt-6 flex gap-3'>
                    <button
                        className='flex-1 bg-blue-600 text-white py-2 rounded-lg
                                   shadow hover:bg-blue-700 transition active:scale-95'
                        onClick={handleCreateUpdateRole}
                    >
                        {isUpdatingRole ? "Update" : "Create"}
                    </button>

                    <button
                        className='w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center
                                   shadow hover:bg-red-600 transition'
                        onClick={clearInput}
                    >
                        <IoIosCloseCircleOutline className='text-2xl' />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default RoleModal