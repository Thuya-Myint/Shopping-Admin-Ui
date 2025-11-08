import React, { useEffect, useState } from 'react';
import { FaP, FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../services/category.service';
import { toast } from 'react-toastify';
const Category = () => {

    const [categoryName, setCategoryName] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [updatingCategoryId, setUpdatingCategoryId] = useState()

    useEffect(() => {
        handleGetAllCategories()
    }, [])

    const addOrUpdateCategory = async () => {
        if (!categoryName || categoryName.trim() === "") return
        try {
            const response = updatingCategoryId
                ?
                await updateCategory(updatingCategoryId, { name: categoryName })
                :
                await createCategory({ name: categoryName })

            if (response.success) {
                const updatedData = allCategories.map(
                    category => category._id === updatingCategoryId
                        ?
                        response.data
                        :
                        category
                )
                console.log("updatedata ", updatedData)
                setCategoryName("")
                setAllCategories(updatingCategoryId ? updatedData : [...allCategories, response.data])
                toast.success(response.message)
                setUpdatingCategoryId()
            }

        } catch (error) {
            console.log("error add new category", error)
        }
    }
    const handleGetAllCategories = async () => {
        try {


            const response = await getAllCategories()
            if (response.success) {
                setAllCategories(response.data)
            } else {
                setAllCategories([])

            }
        } catch (error) {
            console.log("error handleGetAllCategories", error)
        }
    }
    const handleDeleteCategory = async (id) => {
        try {
            const response = await deleteCategory(id)
            if (response.success) {
                toast.success(response.message)
                setAllCategories(allCategories.filter((item) => item._id !== id))
            }
        } catch (error) {
            console.log("handleDelete Category", error)
        }
    }
    return (
        <div>
            <div className='border-l-4  border-indigo-500 p-2 px-4 bg-blue-400 w-fit text-white'>Add new unit</div>

            <form action="" className='flex gap-2 mt-2 ' onSubmit={(e) => {
                e.preventDefault()
                addOrUpdateCategory()
            }}>
                <input
                    value={categoryName}
                    type="text"
                    className='p-2 border-2 border-gray-400 focus:border-gray-800 rounded-md'
                    placeholder='Category '
                    onChange={(e) => {
                        setCategoryName(e.target.value)
                    }} />
                <button
                    className={`bg-slate-600 text-white p-2 px-4 rounded-md active:opacity-30 `}
                >
                    {

                        updatingCategoryId ?
                            "Update"
                            :
                            "Add"
                    }
                </button>
            </form>

            <div className='border-l-4 mt-10 border-indigo-500 p-2 px-4 bg-blue-400 w-fit text-white'>Add Category</div>
            <div className='w-1/3 max-h-[500px] overflow-auto '>
                <div className=' bg-gradient-to-br from-blue-400/60 to-indigo-500/60 flex items-center justify-between mt-2 rounded-md p-2'>
                    <div>No</div>
                    <div>Name</div>
                    <div>Action</div>

                </div >
                {
                    allCategories.map((item, index) => (
                        <div key={index} className={`flex items-center mt-1  justify-between rounded-xl p-2 
                                ${index % 2 === 0 ?
                                'bg-blue-400/40'
                                :
                                'bg-indigo-500/30'

                            }`}>
                            {
                                updatingCategoryId && updatingCategoryId === item._id ?
                                    "Updating"
                                    :
                                    <>
                                        <div>{index + 1}</div>
                                        <div>{item.name}</div>
                                    </>
                            }
                            <div className='flex items-center gap-1'>
                                {
                                    updatingCategoryId && updatingCategoryId === item._id ?
                                        <div className='text-sm bg-green-300 p-2 text-black/50 cursor-pointer rounded-md py-1' onClick={() => {
                                            setUpdatingCategoryId()
                                            setCategoryName("")
                                        }}>
                                            Cancel Update
                                        </div>
                                        :
                                        <FaPencil
                                            className='text-blue-400 cursor-pointer'
                                            onClick={() => {
                                                setUpdatingCategoryId(item._id)
                                                setCategoryName(item.name)
                                            }}

                                        />
                                }
                                <TiDelete className='text-red-500 text-xl cursor-pointer' onClick={() => handleDeleteCategory(item._id)} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default Category;