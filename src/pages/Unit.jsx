import React, { useEffect, useRef, useState } from 'react';
import { getAllUnit, addNewUnit, updateUnit, deleteUnit } from '../services/unit.service';
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import LoadingV1 from '../components/LoadingV1';
import { toast } from 'react-toastify';

const Unit = () => {
    const [allUnits, setAllUnits] = useState([]);
    const [unitName, setUnitName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [updatingItemId, setUpdatingItemId] = useState(null);
    const unitNameRef = useRef(null);

    useEffect(() => {
        handleFetchAllUnits();
    }, []);

    const handleDeleteUnit = async (id) => {
        let response;
        try {
            response = await deleteUnit(id);
            if (response.success) {
                setUpdatingItemId(null);
                setUnitName("");
                toast.success(response.message);
                setAllUnits(allUnits.filter(unit => unit._id !== id));
            }
        } catch (error) {
            console.log("delete unit error", response?.data.message);
        }
    };

    const handleAddUpdateNewUnit = async () => {
        if (unitName.trim() === "") return;
        let response;
        try {
            setIsAdding(true);

            const payload = { name: unitName };
            response = updatingItemId
                ? await updateUnit(updatingItemId, payload)
                : await addNewUnit(payload);

            if (response?.success) {
                toast.success(response?.message);

                const updatedDatas = allUnits.map(unit =>
                    unit._id === updatingItemId
                        ? { ...response.data, name: response.data.name }
                        : unit
                );

                updatingItemId
                    ? setAllUnits(updatedDatas)
                    : setAllUnits(prev => [...prev, response.data]);

                setUpdatingItemId();
            } else {
                toast.error(response?.message);
            }
            setUnitName("");
        } catch (error) {
            console.log("add or update unit error ", response?.data?.message);
        } finally {
            setIsAdding(false);
        }
    };

    const handleFetchAllUnits = async () => {
        try {
            setIsLoading(true);
            const response = await getAllUnit();

            if (response?.success) {
                setAllUnits(response.data);
            }
        } catch (error) {
            console.log("get all unit error ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 
                            text-white px-4 py-2 rounded-md w-fit shadow-md">
                Add New Unit
            </div>

            {/* FORM */}
            <form
                className="flex gap-3 mt-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddUpdateNewUnit();
                }}
            >
                <input
                    ref={unitNameRef}
                    value={unitName}
                    type="text"
                    placeholder="Enter unit name"
                    onChange={(e) => setUnitName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2
                               bg-gray-50 focus:ring-2 focus:ring-blue-500 
                               outline-none w-64"
                />

                <button
                    disabled={isAdding || isLoading}
                    className={`bg-blue-600 text-white px-5 rounded-lg shadow 
                                hover:bg-blue-700 active:scale-95 transition
                                ${(isAdding || isLoading) &&
                        "opacity-50 cursor-not-allowed"}`}
                >
                    {isAdding || isLoading ? <LoadingV1 /> : updatingItemId ? "Update" : "Add"}
                </button>
            </form>

            {/* LIST HEADER */}
            <div className="mt-10 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 
                            text-white px-4 py-2 rounded-md w-fit shadow-md">
                All Units
            </div>

            {/* UNITS LIST */}
            {isLoading ? (
                <LoadingV1 margin="m-4" />
            ) : (
                <div className="w-full sm:w-2/3 max-h-[480px] overflow-auto mt-4">

                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-3 px-4 py-2 bg-gray-200 rounded-md shadow-sm text-gray-700 font-medium">
                        <div>No</div>
                        <div>Name</div>
                        <div className="text-center">Action</div>
                    </div>

                    {/* TABLE ROWS */}
                    {allUnits.map((unit, index) => (
                        <div
                            key={index}
                            className={`
                                grid grid-cols-3 items-center px-4 py-3 mt-2 rounded-md transition
                                ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                                shadow-sm
                            `}
                        >
                            {updatingItemId === unit?._id ? (
                                <div className="col-span-2 text-blue-600 font-medium">Updating...</div>
                            ) : (
                                <>
                                    <div>{index + 1}</div>
                                    <div className="font-medium">{unit?.name}</div>
                                </>
                            )}

                            <div className="flex justify-center gap-3">

                                {/* CANCEL BUTTON */}
                                {updatingItemId === unit?._id ? (
                                    <div
                                        className="text-sm bg-yellow-400 px-3 py-1 rounded-md 
                                                   text-gray-900 shadow cursor-pointer"
                                        onClick={() => {
                                            setUpdatingItemId();
                                            setUnitName("");
                                        }}
                                    >
                                        Cancel
                                    </div>
                                ) : (
                                    <FaPencil
                                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                                        onClick={() => {
                                            unitNameRef.current.focus();
                                            setUpdatingItemId(unit?._id);
                                            setUnitName(unit?.name);
                                        }}
                                    />
                                )}

                                {/* DELETE BUTTON */}
                                <TiDelete
                                    className="text-red-500 cursor-pointer text-xl hover:text-red-700 transition"
                                    onClick={() => handleDeleteUnit(unit?._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Unit;