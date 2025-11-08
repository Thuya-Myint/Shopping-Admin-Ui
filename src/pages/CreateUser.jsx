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

    useEffect(() => {
        console.log("users ", users)
    }, [users])

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
        <div >
            <div className=' flex w-full justify-end items-center gap-2 italic'>
                Create New
                <div className='flex  items-center gap-2 relative'>
                    <div div className=' rounded-lg  cursor-pointer active:from-indigo-400 active:to-blue-400 active:opacity-80 p-2 text-white bg-gradient-to-br from-blue-400 to-indigo-400' onClick={() => {
                        setIsAddingUser(true)
                        setIsUpdatingUser(false)
                    }}>
                        < HiUserAdd className='text-xl' />
                    </div >
                    <div div className=' rounded-lg  cursor-pointer active:from-green-400 active:to-teal-400 active:opacity-80 p-2 text-white bg-gradient-to-br from-teal-400 to-green-400' onClick={() => setIsRoleClicked(!isRoleClicked)}>
                        < PiUserListBold className='text-xl' />
                    </div >

                </div>
                {
                    isRoleClicked &&
                    <div className='bg-white flex flex-col p-2 text-sm  rounded-lg border-2 border-slate-200  shadow-lg shadow-black/20 absolute right-3 top-32 '>
                        <button className='transition-all duration-300 cursor-pointer hover:bg-gradient-to-br from-white to-slate-200 rounded-xl p-2' onClick={() => {
                            setIsAddingRole(!isAddingRole)
                            setIsRoleClicked(false)
                        }}>
                            Create Role
                        </button>
                        <button className='transition-all duration-300 cursor-pointer hover:bg-gradient-to-br from-white to-slate-200 rounded-xl p-2' onClick={() => {
                            setIsManagingRole(!isManagingRole)
                            setIsRoleClicked(false)
                        }}>
                            Manage Role
                        </button>
                    </div>
                }
            </div>
            <div className='grid grid-cols-4 mt-4 gap-2'>

                {
                    users.map((user, index) => (
                        <div key={user?._id} className='relative bg-slate-50 p-4 rounded-xl shadow-xl shadow-black/10'>
                            {
                                user?.imageUrl &&
                                <img src={user?.imageUrl} alt="" className='w-12 h-12 rounded-full border-slate-300 border-2' />
                            }
                            <div className='flex flex-col gap-1'>
                                <div className='mt-4'>Name : {user?.name}</div>
                                <div>Role : {user?.role?.name}</div>
                                <div>Email : {user?.email || "No Email"}</div>
                                <div className='bg-blue-400 absolute p-2 rounded-xl right-4 top-4 cursor-pointer '
                                    onClick={() => {
                                        setIsUpdatingUser(true)
                                        setIsAddingUser(false)
                                        setUserData(user)

                                    }}>
                                    <FaPencil className='text-white' />
                                </div>
                                <div>
                                    Status : {user?.active ? "Acitve" : "UnActive"}
                                </div>
                            </div>
                            <div className=' flex items-center justify-between bg-black/10 p-2 px-4 rounded-xl mt-2'>
                                Action
                                <div className='text-xl text-white flex gap-2'>
                                    <div className='bg-red-400 p-1 rounded-full cursor-pointer'>
                                        <TiDelete />
                                    </div>

                                    <div className='bg-orange-400 p-1 rounded-full cursor-poiinter'>
                                        <HiUserRemove />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                isAddingUser || isUpdatingUser ?
                    <UserModal
                        setIsAddingUser={setIsAddingUser}
                        setUsers={setUsers}
                        isUpdatingUser={isUpdatingUser}
                        isAddingUser={isAddingUser}
                        userData={userData}
                        setIsUpdatingUser={setIsUpdatingUser} /> : ""


            }
            {
                isAddingRole || isUpdatingRole ?
                    <RoleModal
                        setIsAddingRole={setIsAddingRole}
                        isUpdatingRole={isUpdatingRole}
                        dataToUpdate={dataToUpdate}
                        setIsUpdatingRole={setIsUpdatingRole}
                        setDataToUpdate={setDataToUpdate}
                    /> : ""
            }
            {
                isManagingRole &&
                <ManageRoleModal
                    setIsManagingRole={setIsManagingRole}
                    setDataToUpdate={setDataToUpdate}
                    setIsUpdatingRole={setIsUpdatingRole}


                />
            }

        </div >
    );
};

export default CreateUser;