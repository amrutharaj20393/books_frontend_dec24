import React, { useContext, useEffect, useState } from 'react'

import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateProfile } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { adminprofileupdatestatusContext } from '../../context/ContextShare'
function AdminSettings() {

    const [adminDetails, setAdminDetails] = useState({
        username: "",
        password: "",
        cpassword: "",
        profile: ""
    })
    console.log(adminDetails)
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingProfileImage, setexistingProfileImage] = useState("")
    const [updatestatus, setUpdateStatus] = useState({})
    const { setAdminprofileupdatestatus } = useContext(adminprofileupdatestatusContext)

    const handleFileAdd = (e) => {
        setAdminDetails({ ...adminDetails, profile: e.target.files[0] })

        const url = URL.createObjectURL(e.target.files[0])
        // console.log(url)
        setPreview(url)

    }
    //console.log(preview)
    const handleReset = () => {

        if (sessionStorage.getItem("token")) {
            // const token = sessionStorage.getItem("token")
            //setToken(token)

            const user = JSON.parse(sessionStorage.getItem("existingUser"))

            setAdminDetails({ username: user.username, password: user.password, cpassword: user.password })
            setexistingProfileImage(user.profile)
        }
        setPreview("")
    }
    const handleAdd = async () => {
        const { username, password, cpassword, profile } = adminDetails
        if (!username || !password || !cpassword) {
            toast.info("please fill all details")
        }
        else {

            if (password != cpassword) {
                toast.warning('password must match')
            }
            else {
                if (preview) {
                    const reqBody = new FormData()

                    for (let key in adminDetails) {
                        reqBody.append(key, adminDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateProfile(reqBody, reqHeader)
                    console.log(result)
                    if (result.status == 200) {
                        toast.success('profile uploaded successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setAdminprofileupdatestatus(result.data)

                    }
                    else {
                        toast.error("something went wrong")
                        setUpdateStatus(result)
                    }
                }
                else {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateProfile({ username, password, profile: existingProfileImage }, reqHeader)
                    console.log(result)
                    if (result.status == 200) {
                        toast.success('profile uploaded successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setAdminprofileupdatestatus(result.data)
                    }
                    else {
                        toast.error("something went wrong")
                        setUpdateStatus(result)
                    }
                }
            }
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)

            const user = JSON.parse(sessionStorage.getItem("existingUser"))

            setAdminDetails({ username: user.username, password: user.password, cpassword: user.password })
            setexistingProfileImage(user.profile)
        }

    }, [updatestatus])
    return (
        <>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex  flex-col items-center md:p-5'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='text-center text-2xl font-medium'>Settings</h1>
                    <div className='md:grid grid-cols-2 px-5 md:py-5'>
                        <div className='md:mt-10 mt-5 md:p-10 p-5'>
                            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, delectus laboriosam inventore quae nesciunt distinctio ab eveniet perspiciatis quaerat voluptates totam quam quas modi atque magnam vel praesentium quo suscipit!Lorem.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est tempora maxime voluptatum doloremque, in aspernatur temporibus quidem. Voluptatibus, neque aut, ullam magni iure consequuntur nam enim facilis eaque tenetur fuga.<br /> <br />
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae nihil iusto, quod reiciendis commodi adipisci consequuntur. Totam, iusto nulla! Quas ipsam id itaque ab maiores provident nulla magnam modi quidem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, delectus laboriosam inventore quae nesciunt distinctio ab eveniet perspiciatis quaerat voluptates totam quam quas modi atque magnam vel praesentium quo suscipit!Lorem.
                            </p>

                        </div>
                        <div className='flex justify-center items-center mt-5 mb-5 flex-col bg-blue-100 p-5 '>
                            <form className='md:p-10 p-5 w-full flex justify-center items-center flex-col'>
                                <label htmlFor="AdminProfilefile" style={{ marginBottom: '50px', }}>
                                    <input id="AdminProfilefile" onChange={(e) => handleFileAdd(e)} type="file" style={{ display: 'none' }} />

                                    {existingProfileImage == "" ? <img className='z-54' src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/3686/3686930.png"} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} /> :

                                        <img className='z-54' src={preview ? preview : `${serverUrl}/upload/${existingProfileImage}`} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}

                                    <FontAwesomeIcon icon={faPen} className='bg-yellow-300 text-whit py-3 px-4 rounded' style={{ marginLeft: '90px', marginTop: '-100px' }} /></label>


                                <div className=' mt-5 w-full px-5'>
                                    <input name='username' onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} value={adminDetails.username} type="text" placeholder='UserName' className='w-full p-2 rounded border-gray-300 placeholder-gray-500 bg-white ' />

                                </div>
                                <div className=' mt-3 w-full px-5'>
                                    <input name='password' onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} value={adminDetails.password} type="text" placeholder='Password' className='w-full p-2 rounded border-gray-300 placeholder-gray-500 bg-white ' />

                                </div>
                                <div className=' mt-3 w-full px-5'>
                                    <input name='cpassword' onChange={(e) => setAdminDetails({ ...adminDetails, cpassword: e.target.value })} value={adminDetails.cpassword} type="text" placeholder='Confirm Password' className='w-full p-2 rounded border-gray-300 placeholder-gray-500 bg-white ' />

                                </div>
                                <div className='flex justify-center items-center mt-3 w-full px-5'>
                                    <button onClick={handleReset} type='button' className='text-white bg-amber-600 rounded p-2 w-full  hover:border hover:border-amber-600 hover:bg-white hover:text-amber-600'>Cancel</button>
                                    <button onClick={handleAdd} type='button' className='text-white bg-green-600 rounded p-2 ms-2 w-full  hover:border hover:border-green-600 hover:bg-white hover:text-green-600'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default AdminSettings