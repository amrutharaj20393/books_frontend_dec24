import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
    <Header/>
    <div className='container' style={{marginTop:'200px'}}>
        <div className='md:grid grid-cols-2'>
            <div>
                <h1 className='md:text-4xl text-green-400'>Congrats</h1>
                <p className='my-4 text-2xl'>Thank you for shopping</p>
                <Link to ={'/all-Books'}><button className='bg-blue-400 px-4 py-3 text-white '>Explore More Books</button></Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://media.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif" alt="" />
            </div>

        </div>
    </div>
    <Footer/>
</>
  )
}

export default PaymentSuccess
