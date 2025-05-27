import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBook, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Header() {
    const [status, setStatus] = useState(false)
    const [dropdownstatus, setDropdownStatus] = useState(false)
    const [token, setToken] = useState("")

    //console.log(token)
    useEffect(() => {
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            setToken(token)
        }
       

    }, [])
    return (
        <>
            <div className='grid grid-cols-3 p-3 '>
                <div className='flex items-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" alt="" style={{ width: '50px,', height: '50px' }} />
                    <h1 className='text-1xl  md:hidden ms-2'>BOOK STORE</h1>
                </div>
                <div className='md:flex justify-center items-center hidden'><h1 className='text-3xl'>BOOK STORE</h1></div>
                <div className='md:flex justify-end items-center hidden'>
                     <FontAwesomeIcon icon={faInstagram} className='me-3' />
                    <FontAwesomeIcon icon={faTwitter} className='me-3' />
                    <FontAwesomeIcon icon={faFacebook} className='me-3' />

                   { !token? <Link to={'/login'}><button className='border border-black rounded px-3 py-2'><FontAwesomeIcon icon={faUser} />Login</button></Link>:


                

                     <div className="relative inline-block text-left">
                        <div>
                            <button onClick={() => setDropdownStatus(!dropdownstatus)} type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" style={{ width: '40px', height: '40px' }} className='mx-2' />

                            </button>
                        </div>


                        {dropdownstatus && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">

                                <Link to={'/profile'}> <p class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faUser} className='me-2' />Profile</p></Link>
                                <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

                            </div>
                        </div>}
                    </div>}

                </div>


            </div>
            <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center items-center'>
                <div className='flex justify-between items-center px-3 md:hidden'>
                    <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>

                  {!token ?  <Link to={'/login'}><button className='border border-black rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>:
                  
                    <div className="relative inline-block text-left">
                        <div>
                            <button onClick={() => setDropdownStatus(!dropdownstatus)} type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs " id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" style={{ width: '40px', height: '40px' }} className='mx-2' />

                            </button>
                        </div>


                        {dropdownstatus && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">

                                <Link to={'/profile'}> <p class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faUser} className='me-2' />Profile</p></Link>
                                <button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>

                            </div>
                        </div>}
                    </div>}
                </div>
                <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
                    <Link to={'/'}> <li className='mx-4'>Home</li></Link>
                    <Link to={'/all-Books'}><li className='mx-4'>Books</li></Link>
                    <Link to={'/careers'}><li className='mx-4'>Careers</li></Link>
                    <Link to={'/contactus'}><li className='mx-4'>Contact</li></Link>
                </ul>

            </nav>

        </>
    )
}

export default Header