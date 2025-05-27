import React, { useEffect, useState } from 'react'

import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookApi, getAllBookAdminApi, getAllUsersApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

function AdminBooks() {

    const [allbookstatus, setAllBookStatus] = useState(true)
    const [usersstatus, setUserStatus] = useState(false)
    const [bookdetails, setBookDetails] = useState([])
    const [token, setToken] = useState("")
    const [approvstatus, setApproveStatus] = useState(false)
    const [allusers, setAllUsers] = useState([])
    const getAllBooksAdmin = async (token) => {

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }

        const result = await getAllBookAdminApi(reqHeader)
       // console.log(result)
        if (result.status == 200) {
            setBookDetails(result.data)
        }

    }
    //console.log(bookdetails)

    const approveBook = async (data) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await approveBookApi(data, reqHeader)
        console.log(result)
        if (result.status == 200) {
            setApproveStatus(!approvstatus)
        }
        else {
            toast.error('something went wrong')
        }

    }
    //fun to get all users
    const getAllUsers = async (token) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUsersApi(reqHeader)
        console.log(result)
        if (result.status == 200) {
            setAllUsers(result.data)
           
        }
    }
    console.log(allusers)
   
    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (sessionStorage.getItem("token")) {

            getAllBooksAdmin(token)
            setToken(token)

        }
     if (usersstatus == true) {
            getAllUsers(token)
           
        }
        else {
            console.log('something went wrong')
        }

    }, [approvstatus, usersstatus])

    return (
        <>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex  flex-col items-center p-5'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='text-center text-2xl font-medium mt-5'>All Books</h1>
                    <div className='mx-20 mt-5'>
                        <div className='flex justify-center items-center'>
                            <p onClick={() => { setAllBookStatus(true); setUserStatus(false); }} className={allbookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'}>All Book</p>

                            <p onClick={() => { setAllBookStatus(false); setUserStatus(true); }} className={usersstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'} >Users</p>
                        </div>
                        {allbookstatus && <div className='md:grid grid-cols-4 w-full mt-10'>
                            {bookdetails?.length > 0 ?
                                bookdetails?.map((item) => (
                                    <div className={item?.status == 'sold' ? 'p-3 shadow-md opacity-25' : 'p-3 shadow-md'}>
                                        <img src={item?.imageurl} alt="" style={{ width: '100%', height: '250px' }} />
                                        <div className='flex  justify-center items-center flex-col ms-3'>
                                            <p className='text-blue-700'>{item?.author}</p>
                                            <h3>{item?.title.slice(0, 20)}....</h3>
                                            <p className='text-red-600'>{item?.dprice}</p>
                                            {item?.status == 'pending' && <button onClick={() => approveBook(item)} className='text-white bg-green-800 rounded p-2 w-full hover:bg-white hover:border hover:border-green-700 hover:text-green-700 '>Approve</button>}
                                            {item?.status == 'Approved' &&
                                                <img src='https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png' alt=''
                                                    style={{ width: '50px', height: '50px' }} />

                                            }
                                        </div>

                                    </div>
                                ))
                                : <p>No Books</p>}

                        </div>}
                       {usersstatus && <div className='md:grid grid-cols-3 w-full p-10'>
                            {allusers?.length>0?
                            allusers?.map((users)=>( <div className='bg-gray-200 p-4 rounded md:m-4 mt-4'>
                                <p className='text-red-700 '>ID:{users?._id}</p>
                                <div className='md:grid grid-cols-[1fr_2fr] mt-3'>
                                    <div className='flex justify-center items-center'>
                                        <img src={users?.profile==""?"https://cdn-icons-png.flaticon.com/512/149/149071.png":`${users?.profile}`} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-blue-600'>{users?.username}</p>
                                        <p className='text-blue-600'>{users?.email}</p>
                                    </div>

                                </div>

                            </div>))
                           :<p>No books</p>}
                        </div>}+

                    </div>
                </div>

            </div>
            <Footer />
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default AdminBooks