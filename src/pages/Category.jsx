import React, { useEffect, useState } from 'react';
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../services/category.service';
import { toast } from 'react-toastify';

const Category = () => {
    const [categoryName, setCategoryName] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [updatingCategoryId, setUpdatingCategoryId] = useState();

    useEffect(() => {
        handleGetAllCategories();
    }, []);

    const addOrUpdateCategory = async () => {
        if (!categoryName || categoryName.trim() === "") return;

        try {
            const response = updatingCategoryId
                ? await updateCategory(updatingCategoryId, { name: categoryName })
                : await createCategory({ name: categoryName });

            if (response.success) {
                const updatedData = allCategories.map(category =>
                    category._id === updatingCategoryId ? response.data : category
                );

                toast.success(response.message);
                setCategoryName("");
                setAllCategories(
                    updatingCategoryId ? updatedData : [...allCategories, response.data]
                );
                setUpdatingCategoryId();
            }
        } catch (error) {
            console.log("error add new category", error);
        }
    };

    const handleGetAllCategories = async () => {
        try {
            const response = await getAllCategories();
            setAllCategories(response.success ? response.data : []);
        } catch (error) {
            console.log("error handleGetAllCategories", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await deleteCategory(id);
            if (response.success) {
                toast.success(response.message);
                setAllCategories(allCategories.filter(item => item._id !== id));
            }
        } catch (error) {
            console.log("handleDelete Category", error);
        }
    };

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 
                            text-white px-4 py-2 rounded-md w-fit shadow-md">
                Add New Category
            </div>

            {/* FORM */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addOrUpdateCategory();
                }}
                className="flex gap-3 mt-4"
            >
                <input
                    value={categoryName}
                    type="text"
                    placeholder="Category name"
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 
                               focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                />

                <button
                    className="bg-blue-600 text-white px-5 rounded-lg shadow 
                               hover:bg-blue-700 active:scale-95 transition"
                >
                    {updatingCategoryId ? "Update" : "Add"}
                </button>
            </form>

            {/* LIST HEADER */}
            <div className="mt-10 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 
                            text-white px-4 py-2 rounded-md w-fit shadow-md">
                Category List
            </div>

            {/* CATEGORY LIST */}
            <div className="w-full sm:w-2/3 max-h-[480px] overflow-auto mt-4">

                {/* Table Header */}
                <div className="grid grid-cols-3 px-4 py-2 bg-gray-200 rounded-md shadow-sm text-gray-700 font-medium">
                    <div>No</div>
                    <div>Name</div>
                    <div className="text-center">Action</div>
                </div>

                {/* Items */}
                {allCategories.map((item, index) => (
                    <div
                        key={index}
                        className={`
                            grid grid-cols-3 items-center px-4 py-3 mt-2 rounded-md transition
                            ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                            shadow-sm
                        `}
                    >
                        {/* Index + Name */}
                        {updatingCategoryId === item._id ? (
                            <div className="col-span-2 text-blue-600 font-medium">
                                Updating...
                            </div>
                        ) : (
                            <>
                                <div>{index + 1}</div>
                                <div className="font-medium">{item.name}</div>
                            </>
                        )}

                        {/* Actions */}
                        <div className="flex justify-center gap-3">
                            {updatingCategoryId === item._id ? (
                                <button
                                    className="text-sm bg-yellow-400 px-3 py-1 rounded-md 
                                               text-gray-900 shadow cursor-pointer"
                                    onClick={() => {
                                        setUpdatingCategoryId();
                                        setCategoryName("");
                                    }}
                                >
                                    Cancel
                                </button>
                            ) : (
                                <FaPencil
                                    className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                                    onClick={() => {
                                        setUpdatingCategoryId(item._id);
                                        setCategoryName(item.name);
                                    }}
                                />
                            )}

                            <TiDelete
                                className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition"
                                onClick={() => handleDeleteCategory(item._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;