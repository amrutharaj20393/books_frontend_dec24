import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {
    const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate('/')
    }
    return (
        <>
            <div className='md:flex justify-between flex   md:px-20 md:p-3 p-2'>
                <div className='flex items-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" alt="" style={{ width: '50px,', height: '50px' }} />
                    <h1 className='text-2xl font-medium  ms-2'>BOOK STORE</h1>
                </div>

                <button onClick={logout} className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white'><FontAwesomeIcon icon={faPowerOff} className='md:me-3' />Logout</button>


            </div>
            <marquee behaviour="" direction="left" className="p-3 bg-gray-900 text-white">
                <p>Welcome Admin You are all set to moinitor system.Let'get work</p>
            </marquee>
        </>
    )
}

export default AdminHeader