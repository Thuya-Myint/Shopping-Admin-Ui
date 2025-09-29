import React, { useEffect, useState } from 'react';
import { getAllUnit } from '../services/unit.service';
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
const Unit = () => {
    const [allUnits, setAllUnits] = useState([])
    const [unitName, setUnitName] = useState("")
    useEffect(() => {
        handleFetchAllUnits()
    }, [])
    const handleFetchAllUnits = async () => {
        try {
            const response = await getAllUnit()
            console.log(response)
            if (response?.success) {
                console.log("response ", response.data)
                setAllUnits(response.data)
            }
        } catch (error) {
            console.log("get all unit error ", error)
        }
    }
    return (
        <div>
            <div className=''>
                <div className='border-l-4 border-indigo-500 p-2 px-4 bg-blue-400 w-fit text-white'>Add new unit</div>
                <div className='flex gap-2 mt-2'>
                    <input
                        value={unitName}
                        type="text"
                        onChange={(e) => setUnitName(e.target.value)}
                        className='p-2 border-2 border-gray-400 focus:border-gray-800 rounded-md'
                        placeholder='Enter unit name'
                    />
                    <button className='bg-slate-600 text-white p-2 px-4 rounded-md'>Add</button>
                </div>
            </div>
            <div className='mt-10'>

                <div className='border-l-4 border-indigo-500 p-2 px-4 bg-blue-400 w-fit text-white'>All units</div>

                <div className='w-1/3'>
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
                                <div>{index + 1}</div>
                                <div>{unit?.name}</div>
                                <div className='flex items-center gap-2'>
                                    <FaPencil className="text-blue-500 cursor-pointer" />
                                    <TiDelete className="text-red-500 cursor-pointer text-xl" />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    );
};

export default Unit;