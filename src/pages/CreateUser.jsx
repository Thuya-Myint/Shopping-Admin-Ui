import React, { useEffect, useState } from 'react';
import { getAllAdmin } from '../services/user.service';
import { FaPencil } from 'react-icons/fa6';
import { TiDelete } from 'react-icons/ti';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';
import UserModal from '../components/UserModal';
import { PiUserListBold } from "react-icons/pi";
import RoleModal from '../components/RoleModal';
import ManageRoleModal from '../components/ManageRoleModal';

const CreateUser = () => {
    const [users, setUsers] = useState([])
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [isAddingRole, setIsAddingRole] = useState(false)
    const [isRoleClicked, setIsRoleClicked] = useState(false)
    const [isManagingRole, setIsManagingRole] = useState(false)
    const [dataToUpdate, setDataToUpdate] = useState(null)
    const [isUpdatingRole, setIsUpdatingRole] = useState(false)
    const [isUpdatingUser, setIsUpdatingUser] = useState(false)
    const [userData, setUserData] = useState()

    useEffect(() => {
        handleGetAllAdmin()
    }, [])

    const handleGetAllAdmin = async () => {
        try {
            const response = await getAllAdmin()
            if (response?.success) {
                setUsers(response.data)
            }
        } catch (error) {
            console.log("get all admin error ", error)
        }
    }

    return (
        <div>

            {/* ✅ Top controls */}
            <div className='flex w-full justify-end items-center gap-3 italic mb-4'>
                <span className='text-sm text-gray-700'>Create New</span>

                <div className='flex items-center gap-2 relative'>

                    {/* ADD USER */}
                    <div
                        className='rounded-lg cursor-pointer p-2 
                        bg-gradient-to-br from-blue-500 to-indigo-500 
                        text-white shadow-md hover:shadow-lg active:opacity-70 transition'
                        onClick={() => {
                            setIsAddingUser(true)
                            setIsUpdatingUser(false)
                        }}
                    >
                        <HiUserAdd className='text-xl' />
                    </div>

                    {/* ROLE MENU TOGGLE */}
                    <div
                        className='rounded-lg cursor-pointer p-2 
                        bg-gradient-to-br from-green-400 to-emerald-500 
                        text-white shadow-md hover:shadow-lg active:opacity-70 transition'
                        onClick={() => setIsRoleClicked(!isRoleClicked)}
                    >
                        <PiUserListBold className='text-xl' />
                    </div>

                    {/* ROLE DROPDOWN */}
                    {isRoleClicked && (
                        <div className='bg-white flex flex-col p-2 text-sm rounded-lg w-36 
                        border border-gray-300 shadow-xl absolute right-0 top-14 space-y-1'>
                            <button
                                className='p-2 rounded hover:bg-gray-100 transition'
                                onClick={() => {
                                    setIsAddingRole(true)
                                    setIsRoleClicked(false)
                                }}
                            >
                                Create Role
                            </button>

                            <button
                                className='p-2 rounded hover:bg-gray-100 transition'
                                onClick={() => {
                                    setIsManagingRole(true)
                                    setIsRoleClicked(false)
                                }}
                            >
                                Manage Role
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ✅ User Grid */}
            <div className='grid grid-cols-4 gap-4'>

                {users.map((user) => (
                    <div
                        key={user?._id}
                        className='relative p-5 rounded-xl bg-white 
                        shadow-lg hover:shadow-xl transition border border-gray-200'
                    >
                        {/* User Avatar */}
                        {user?.imageUrl ? (
                            <img
                                src={user?.imageUrl}
                                alt=""
                                className='w-14 h-14 rounded-full border border-gray-300 shadow-sm'
                            />
                        ) : (
                            <div className='w-14 h-14 rounded-full bg-gray-200'></div>
                        )}

                        {/* User Info */}
                        <div className='flex flex-col gap-1 mt-3 text-sm text-gray-700'>
                            <div><strong>Name:</strong> {user?.name}</div>
                            <div><strong>Role:</strong> {user?.role?.name}</div>
                            <div><strong>Email:</strong> {user?.email || "No Email"}</div>

                            {/* EDIT BUTTON */}
                            <div
                                className='absolute right-4 top-4 bg-blue-500 p-2 rounded-lg shadow 
                                cursor-pointer hover:bg-blue-600 transition'
                                onClick={() => {
                                    setIsUpdatingUser(true)
                                    setIsAddingUser(false)
                                    setUserData(user)
                                }}
                            >
                                <FaPencil className='text-white text-sm' />
                            </div>

                            <div><strong>Status:</strong> {user?.active ? "Active" : "Inactive"}</div>
                        </div>

                        {/* Action Footer */}
                        <div className='flex items-center justify-between 
                        bg-gray-100 p-2 rounded-lg mt-4 text-sm'>
                            <span className='text-gray-600'>Actions</span>

                            <div className='flex gap-2 text-lg'>
                                <div className='bg-red-500 p-1 rounded-full text-white cursor-pointer'>
                                    <TiDelete />
                                </div>
                                <div className='bg-orange-400 p-1 rounded-full text-white cursor-pointer'>
                                    <HiUserRemove />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* ✅ User Add / Update Modal */}
            {(isAddingUser || isUpdatingUser) && (
                <UserModal
                    setIsAddingUser={setIsAddingUser}
                    setUsers={setUsers}
                    isUpdatingUser={isUpdatingUser}
                    isAddingUser={isAddingUser}
                    userData={userData}
                    setIsUpdatingUser={setIsUpdatingUser}
                />
            )}

            {/* ✅ Role Add / Update */}
            {(isAddingRole || isUpdatingRole) && (
                <RoleModal
                    setIsAddingRole={setIsAddingRole}
                    isUpdatingRole={isUpdatingRole}
                    dataToUpdate={dataToUpdate}
                    setIsUpdatingRole={setIsUpdatingRole}
                    setDataToUpdate={setDataToUpdate}
                />
            )}

            {/* ✅ Manage Role */}
            {isManagingRole && (
                <ManageRoleModal
                    setIsManagingRole={setIsManagingRole}
                    setDataToUpdate={setDataToUpdate}
                    setIsUpdatingRole={setIsUpdatingRole}
                />
            )}

        </div>
    );
};

export default CreateUser;