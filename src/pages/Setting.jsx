import React, { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { updateUserData } from "../services/user.service"
import { toast } from 'react-toastify'


const UserSetting = () => {
    const { userData, changeUserData } = useUser()
    const [name, setName] = useState(userData.name || "")
    const [password, setPassword] = useState()
    const [email, setEmail] = useState("")
    const [file, setFile] = useState(null)
    const [previewImg, setPreviewImg] = useState(userData?.imageUrl || "")
    const [loading, setLoading] = useState(false)


    const onChangeFile = (file) => {
        if (!file) return
        const url = URL.createObjectURL(file)
        setPreviewImg(url)
        setFile(file)
    }

    const triggerFileOpen = () => document.getElementById("fileupload").click()

    const handleUserUpdate = async () => {
        try {
            if (name === userData.name && email.trim() === "") {
                return toast.info("Validataion failed!")
            }
            const formData = new FormData()
            formData.append("name", name)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("image", file)

            setLoading(true)
            const response = await updateUserData(userData._id, formData)
            console.log(response)

            if (response.success) {
                changeUserData(response.data)
                toast(response.message)

            }
            // console.log("form data ", formData.getAll("image"))


        } catch (error) {
            console.log("update user error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl'>User Information</h1>
            <form className='mt-4 flex flex-col w-fit gap-4 ' onSubmit={(e) => {
                e.preventDefault()
                handleUserUpdate()
            }}>

                <div className='flex flex-col items-center gap-2'>

                    <img src={previewImg} alt="" className='w-20 h-20 rounded-full  cursor-pointer ' />
                    <div className='text-sm cursor-pointer active:bg-gray-700 bg-gray-800 text-white px-4 py-1 rounded-md'
                        onClick={triggerFileOpen}>
                        edit
                    </div>
                    <input type="file" multiple={false} accept='image/*' className='hidden' id='fileupload' onChange={(e) => onChangeFile(e.target.files[0])} />
                </div>

                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="name">Userame</label>
                    <input value={name} type="text" id='name' placeholder='Enter Name' className='p-2 bg-slate-100 rounded-md'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="email">Email</label>
                    <input value={email} type="email" id="email" placeholder='Enter Password' className='p-2 bg-slate-100 rounded-md'
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="password">Password</label>
                    <input value={password} type="password" id='password' placeholder='Enter Password' className='p-2 bg-slate-100 rounded-md'
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='flex justify-center'>
                    <button
                        disabled={loading}
                        className={`bg-green-500 active:bg-green-300 w-fit px-4 py-1 rounded-md text-white disabled:bg-green-200 disabled:cursor-not-allowed`}
                    >
                        Update
                    </button>
                </div>
            </form >
        </div >
    )
}

export default UserSetting