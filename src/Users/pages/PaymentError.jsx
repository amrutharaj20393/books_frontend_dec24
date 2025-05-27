import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentError() {
  return (
    <>
    <Header/>
    <div className='container' style={{marginTop:'200px'}}>
        <div className='md:grid grid-cols-2'>
            <div>
                <h1 className='md:text-4xl text-red-400'>Sorry</h1>
                <p className='my-4 text-2xl'>We appologise for the inconvenience</p>
                <Link to ={'/all-Books'}><button className='bg-blue-400 px-4 py-3 text-white '>Explore More Books</button></Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ141_tFCG1ElFfJS3QhJTsaTogH1Ez159GYA&s" alt="" />
            </div>

        </div>
    </div>
    <Footer/>
    </>
  )
}

export default PaymentError