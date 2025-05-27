import React, { use, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { updateUserProfile } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { userprofileupdatestatusContext } from '../../context/ContextShare'


function EditProfile() {
    const [offcanvasstatus, setOffCanvasStatus] = useState(false)
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        cpassword: "",
        bio: "",
        profile: ""
    })
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [existingProfileImage, setExistingProfileImage] = useState("")
    const [updatestatus, setUpdateStatus] = useState({})
    const {setUserprofileupdatestatus}=useContext(userprofileupdatestatusContext)
    
    const handlefileAdd = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        if (e.target.files[0] != 0) {
            const url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    console.log(preview)
    const handleReset = () => {

        setUserDetails({
            username: "",
            password: "",
            cpassword: "",
            bio: "",
            profile: ""
        })
        setPreview("")

    }
    const handleAdd = async () => {
        const { username,
            password,
            cpassword,
            bio,
            profile } = userDetails
        console.log(username,
            password,
            cpassword,
            bio,
            profile)
        if (!username || !password || !cpassword) {
            toast.info("please fill all")
            setOffCanvasStatus(true)
        }
        {

            if (password != cpassword) {
                toast.warning('password must match')
            }
            else {
                if (preview) {
                    const reqBody = new FormData()

                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await updateUserProfile(reqBody, reqHeader)
                    console.log(result)
                    if (result.status == 200) {
                        toast.success('profile uploaded successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setUserprofileupdatestatus(result.data)

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
                    const result = await updateUserProfile({ username, password,bio, profile: existingProfileImage }, reqHeader)
                    console.log(result)
                    if (result.status == 200) {
                        toast.success('profile uploaded successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        setUpdateStatus(result.data)
                        setUserprofileupdatestatus(result.data)
                       
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
            setUserDetails({ username: user.username, password: user.password, cpassword: user.password, bio: user.bio })
            setExistingProfileImage(user.profile)
        }
    }, [updatestatus])

    return (
        <>
            <div className='flex justify-end mt-3 md:mt-0'>
                <button onClick={() => setOffCanvasStatus(true)} className='text-blue-600 border-blue-600 rounded p-3 hover:bg-blue-600 hover:border hover:border-blue-500 hover:text-white'>
                    <FontAwesomeIcon icon={faPenToSquare} />Edit</button>
            </div>


            {offcanvasstatus && <div>
                <div className='fixed inset-0 bg-gray-500/75 transition-opacity w-full' >
                    <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
                        <div className='bg-gray-500 px-3 py-4 flex justify-between text-white text-2xl'>
                            <h1>Edit User Profile</h1>
                            <FontAwesomeIcon onClick={() => setOffCanvasStatus(false)} icon={faXmark} />

                        </div>

                        <div className='flex justify-center items-center flex-col mt-5 mb-5'>
                            <form className='md:p-10 p-5 w-full flex justify-center items-center flex-col'>
                                <label htmlFor="profilefile">
                                    <input id="profilefile" type="file" style={{ display: 'none' }} onChange={(e) => handlefileAdd(e)} />
                                    {existingProfileImage == "" ? <img className='z-54' src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/3686/3686930.png"} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} /> :

                                        existingProfileImage == existingProfileImage.startsWith('https://') ? <img className='z-54' src={preview ? preview : `${existingProfileImage}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} /> : <img className='z-54' src={preview ? preview :`${serverUrl}/upload/${existingProfileImage}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />}

                                    <div className='bg-yellow-300 z-56 text-white py-4 px-4 rounded' style={{ marginTop: "-50px", marginLeft: "155px" }}><FontAwesomeIcon icon={faPen} /></div>
                                    <div className='mb-3 mt-5 w-full px-5'>
                                        <input onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} type="text" placeholder='UserName' className='w-full p-2 rounded border-gray-300 placeholder-gray-300 ' />

                                    </div>
                                    <div className='mb-3 w-full px-5 '>
                                        <input onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} type="text" placeholder='Password' className='w-full p-2 rounded border-gray-300 placeholder-gray-300 ' />
                                    </div>
                                    <div className='mb-3 w-full px-5'>
                                        <input onChange={(e) => setUserDetails({ ...userDetails, cpassword: e.target.value })} value={userDetails.cpassword} type="text" placeholder='Confirm Password' className='w-full p-2 rounded border-gray-300 placeholder-gray-300 ' />
                                    </div>
                                    <div className='mb-3 w-full px-5'>

                                        <textarea onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} value={userDetails.bio} placeholder='Bio' rows={5} name="" id="" className='w-full p-2 rounded  border-gray-300 placeholder-gray-300 ' ></textarea>
                                    </div>
                                    <div className='flex justify-end px-5 mt-5 w-full'>
                                        <button type='button' onClick={handleReset} className='bg-amber-600 text-black rounded py-3 px-4 hover:text-amber-600 hover:border hover:border-amber-600 hover:bg-white '>Reset</button>
                                        <button type='button' onClick={handleAdd} className='bg-green-600 text-black rounded py-3 px-4 hover:text-green-600 hover:border hover:border-green-600  ms-2 hover:bg-white'>Update</button>
                                    </div>

                                </label>
                            </form>
                        </div>
                    </div>


                </div>
            </div>}
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default EditProfile