import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'


function Footer() {
    return (
        <>
            <div className='gri p-2  bg-gray-600 text-white md:grid grid-cols-[repeat(3,1fr)] text-justify '>

                <div className='md:flex justify-center  flex-col md:p-5 mt-3'>
                    <h3 className='mt-3'>ABOUT US</h3>
                    <p className='mt-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eligendi hic laborum? Tempora, saepe tempore nisi vel placeat ab atque iure non exercitationem deserunt! Quas, aliquam! Quod, vero esse! Quod.</p>
                </div>
                <div className='md:flex justify-center  flex-col  md:p-5  md:ms-15'>
                    <h3 className='mt-3 '>NEWSLETTER</h3>
                    <p className='mt-3'>Stay updated with our latest trends</p>
                    <div className='flex'><input type="text" placeholder='Email Id' className='mt-5 bg-white w-45   placeholder-gray-500 ' /><FontAwesomeIcon icon={faArrowRight} className='bg-amber-300 mt-5' style={{ height: '35px'}} /></div>
                </div>
                <div className='md:flex justify-center flex-col  md:p-5  md:ms-15 '>
                    <h3 className='mt-3'>Follow Us</h3>
                    <p className='mt-3'> Let us be social</p>
                    <div  className='mt-2'>
                    <FontAwesomeIcon icon={faInstagram} className='me-3' />
                    <FontAwesomeIcon icon={faTwitter} className='me-3' />
                    <FontAwesomeIcon icon={faFacebook} className='me-3' />
                    </div>
                    


                </div>
            </div>
            <div className='bg-black text-white h-10 justify-center items-center'>
                <p className='text-center md:p-2'>Copywrite @2023 All Rights Reserved|This Website is made by Amrutha Raj</p>
            </div>
        </>
    )
}

export default Footer