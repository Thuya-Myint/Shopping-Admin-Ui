import React, { useEffect, useRef, useState } from 'react';
import { getAllUnit, addNewUnit, updateUnit, deleteUnit } from '../services/unit.service';
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import LoadingV1 from '../components/LoadingV1';
import { toast } from 'react-toastify';

const Unit = () => {
    const [allUnits, setAllUnits] = useState([])
    const [unitName, setUnitName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [updatingItemId, setUpdatingItemId] = useState(null)
    const unitNameRef = useRef(null)

    useEffect(() => {
        handleFetchAllUnits()
    }, [])

    const handleDeleteUnit = async (id) => {
        let response;
        try {
            response = await deleteUnit(id)
            if (response.success) {
                setUpdatingItemId(null)
                setUnitName("")
                toast.success(response.message)
                setAllUnits(allUnits.filter(unit => unit._id !== id))
            }

        } catch (error) {
            console.log("delete unit error", response?.data.message)
        }
    }
    const handleAddUpdateNewUnit = async () => {
        if (unitName.trim() === "") return
        let response
        try {
            setIsAdding(true)
            const payload = { name: unitName }
            response = updatingItemId ? await updateUnit(updatingItemId, payload) : await addNewUnit(payload)
            if (response?.success) {
                console.log(response.data)
                toast.success(response?.message)
                const updatedDatas = allUnits.map(unit => unit._id === updatingItemId ? {
                    ...response.data,
                    name: response.data.name
                } : unit)
                console.log("upd", updatedDatas)
                updatingItemId ?
                    setAllUnits(updatedDatas)
                    :
                    setAllUnits(prev => [...prev, response.data])

                setUpdatingItemId()

            } else {
                toast.error(response?.message)
            }
            setUnitName("")
        } catch (error) {
            // toast.error(response.data.message)
            console.log("add or update unit error ", response.data.message)
        } finally {
            setIsAdding(false)
        }
    }
    const handleFetchAllUnits = async () => {
        try {
            setIsLoading(true)
            const response = await getAllUnit()

            if (response?.success) {
                console.log("response ", response.data)
                setAllUnits(response.data)
            }
        } catch (error) {
            console.log("get all unit error ", error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <div className=''>
                <div className='border-l-4 border-indigo-500 p-2 px-4 bg-blue-400 w-fit text-white'>Add new unit</div>
                <form className='flex gap-2 mt-2' onSubmit={(e) => {
                    e.preventDefault()
                    handleAddUpdateNewUnit()
                }}>
                    <input
                        value={unitName}
                        ref={unitNameRef}
                        type="text"
                        onChange={(e) => setUnitName(e.target.value)}
                        className='p-2 border-2 border-gray-400 focus:border-gray-800 rounded-md'
                        placeholder='Enter unit name'
                    />
                    <button
                        disabled={isAdding || isLoading}
                        className={`bg-slate-600 text-white p-2 px-4 rounded-md active:opacity-30 ${isAdding || isLoading ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                    >
                        {
                            isLoading || isAdding ?
                                <LoadingV1 />
                                :
                                updatingItemId ? "Update" : "Add"
                        }
                    </button>
                </form>
            </div>
            <div className='mt-10 h-full'>

                <div className='border-l-4 border-indigo-500 p-2 px-4 bg-blue-400 w-fit text-white'>All units</div>

                {
                    isLoading ?
                        <LoadingV1 margin={"m-4"} />
                        :
                        <div className='w-1/3 max-h-[500px] overflow-auto '

                        >
                            <div className=' bg-gradient-to-br from-blue-400/60 to-indigo-500/60 flex items-center justify-between mt-2 rounded-md p-2'>
                                <div>No</div>
                                <div>Name</div>
                                <div>Action</div>

                            </div>
                            {
                                allUnits?.map((unit, index) => (
                                    <div key={index} className={`flex items-center mt-1  justify-between rounded-xl p-2 
                                ${index % 2 === 0 ?
                                            'bg-blue-400/40'
                                            :
                                            'bg-indigo-500/30'

                                        }`}>
                                        {
                                            updatingItemId === unit?._id ?
                                                <div>Updating</div>
                                                :
                                                <>
                                                    <div>{index + 1}</div>
                                                    <div>{unit?.name}</div>
                                                </>
                                        }
                                        <div className='flex items-center gap-2'>
                                            {
                                                updatingItemId === unit?._id ?
                                                    <div className='text-sm bg-green-300 p-2 text-black/50 cursor-pointer rounded-md py-1' onClick={() => {
                                                        setUpdatingItemId()
                                                        setUnitName("")
                                                    }}>
                                                        Cancel Update
                                                    </div> :
                                                    <FaPencil className={` cursor-pointer text-blue-500 active:text-blue-300`}
                                                        onClick={() => {
                                                            unitNameRef.current.focus()
                                                            setUpdatingItemId(unit?._id)
                                                            setUnitName(unit?.name)
                                                        }} />
                                            }
                                            <TiDelete
                                                className="text-red-500 cursor-pointer text-xl active:text-red-300"
                                                onClick={() => handleDeleteUnit(unit?._id)}

                                            />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                }
            </div>

        </div>
    );
};

export default Unit;