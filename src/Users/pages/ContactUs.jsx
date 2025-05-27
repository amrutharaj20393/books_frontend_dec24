import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function ContactUs() {
    return (
        <>
            <Header />
            <div className='flex justify-center items-center flex-col md:px-40 px-10'>
                <h1 className='my-5 text-3xl font-medium'>ContactUs</h1>
                <p className='md:text-center text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum nostrum fugit numquam ipsum reprehenderit accusamus voluptatem nihil, maiores quos obcaecati nesciunt voluptatum iste aut? Ratione veritatis consequuntur reprehenderit necessitatibus .Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus tempora architecto, porro illum vitae hic doloribus perspiciatis. Iste, consequuntur ut voluptatem minus dignissimos vero reprehenderit recusandae, quo placeat cum quasi?</p>

            </div>
            <div className='flex justify-center items-center md:p-10 md:px-40  flex-col '>
                <div className='md:grid grid-cols-3 w-full mt-5 p-5 md:ms-0 ms-5'>
                    <div className='md:flex items-center justify-center  '>
                        <div className="w-[30px] h-[35px] rounded-full bg-gray-300 border border-gray-900 flex items-center justify-center mt-3 p">
                            <FontAwesomeIcon icon={faLocationDot} className="text-black" />
                        </div>
                        <div className='ms-2'>
                            <p>123 Man street,apt </p>
                            <p>Sector16 Romsy Road</p>
                        </div>
                    </div>
                    <div className='md:flex items-center justify-center  '>
                        <div className="w-[30px] h-[35px] rounded-full bg-gray-300 border border-gray-900 flex items-center justify-center mt-3 p">
                            <FontAwesomeIcon icon={faPhone} className="text-black" />
                        </div>

                        <div className='ms-2'>
                            <p>31046898765 </p>

                        </div>

                    </div>

                    <div className='md:flex items-center justify-center  '>
                        <div className="w-[30px] h-[35px] rounded-full bg-gray-300 border border-gray-900 flex items-center justify-center mt-3 p">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>

                        <div className='ms-2'>
                            <p>bookstore@gmail.com </p>

                        </div>

                    </div>


                </div>
            </div>

            <div className='flex justify-center items-center flex-col md:p-10 md:px-40 '>
                <div className='md:grid grid-cols-2 w-full '>
                    <div className='md:flex justify-center items-center flex-col md:p-10 w-full ms-2 mb-10'>
                      
                        <form className='w-full bg-gray-300 md:p-10 flex justify-center items-center flex-col h-[450px] px-1  ' action="">
                        <h3 className='text-2xl mb-5 font-bold px-5 '>Send Me MessAGE</h3>
                        <div className='mb-5 w-full mt-8'>
                                <input type="text" placeholder='Name' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
                            </div>
                            <div className='mb-5 w-full mt-8'>
                                <input type="text" placeholder='EmailId' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
                            </div>
                            <div className='mb-5 w-full mt-8'>
                               
                                <textarea name="Message" placeholder='Message' rows="3" className='p-2 rounded placeholder-gray-600 bg-white w-full'></textarea>
                            </div>

                        </form>

                    </div >
                    <div className="md:mt-20  h-[450px] rounded-lg md:mb-30 mb-25 ms-2 w-full  ">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251479.23612396815!2d76.13730549326479!3d9.986838225244904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1745431217407!5m2!1sen!2sin"  height="100%"  width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default ContactUs