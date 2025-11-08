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
        setDescription()
        setDataToUpdate()
    }
    const handleCreateUpdateRole = async () => {
        console.log("erwe")
        if (!name || name.trim() === "" || allowedPaths.length === 0) {
            return toast.warn("Invalid input")
        }
        try {
            const commonPayload = {
                name,
                description: description || "",
                allowedPaths
            }
            const finalDbFn = isUpdatingRole ? await updateRole({ ...commonPayload, id: dataToUpdate._id }) : await createRole(commonPayload)
            const response = await finalDbFn

            if (response?.success) {
                console.log("wwerwerwerwer")
                toast.success(response.message)
                clearInput()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-black/30 absolute inset-0'
            onClick={(e) => {

                setIsAddingRole(false)
            }}>
            <div className='bg-white shadow-lg shadow-black/20 rounded-lg p-4 flex flex-col'
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}

            >
                <h1 className='text-xl font-light mb-4'>
                    {isUpdatingRole ? `Update permission for ${dataToUpdate?.name}` : 'Create New Role'}
                </h1>
                <div className='flex gap-2'>

                    <input value={name} onChange={(e) => { setName(e.target.value) }} className='border-gray-800 border-2 p-2 outline-0 rounded-lg w-1/2 bg-slate-200' placeholder='role name' />
                    <input value={description} onChange={(e) => { setDescription(e.target.value) }} className='border-gray-800 border-2 p-2 outline-0 rounded-lg w-1/2 bg-slate-200 ' placeholder='role name' />

                </div>
                <h1 className='text-lg mt-4 font-light mb-4'>Permit Page</h1>
                <div className='grid grid-cols-3 gap-2 text-md font-light'>
                    {
                        sideBarItems.map(item => (

                            <div key={item.path} className={`bg-gradient-to-br shadow-md shadow-black/10 p-2 rounded-md cursor-pointer ${allowedPaths.includes(item.path) ? 'from-blue-300 to-sky-400' : ' from-slate-50 to-slate-300/60'}`}
                                onClick={() => handleSelectPaths(item.path)}>
                                {item.name}
                            </div>
                        ))
                    }
                </div>
                <div className='mt-4 flex gap-2'>
                    <button className='w-4/5 bg-gradient-to-br cursor-pointer from-green-300 to-emerald-400 p-2 rounded-lg' onClick={handleCreateUpdateRole}>
                        {isUpdatingRole ? "Update" : "Create"}
                    </button>
                    <div className='bg-gradient-to-br from-red-400 cursor-pointer to-orange-500 w-1/5 text-white text-2xl flex items-center justify-center rounded-lg' onClick={clearInput}>
                        <IoIosCloseCircleOutline />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default RoleModal