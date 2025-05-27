import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
    return (
        <>
            <div className='w-full min-h-screen flex justify-center items-center'>
                <div className='md:grid grid-cols-3'>
                    <div></div>
                    <div className='w-full min-h-screen flex justify-center items-center flex-col p-5 md:p-0'>
                        <img src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png" alt="pade not found" />
                        <p className='md:text-2xl '>oh No!</p>
                        <h2 className='md:text-5xl text-2xl '>Look Like You're Lost</h2>
                        <h5 className='md:text-2xl '>The Page you are looking for is not available</h5>
                        <Link to={'/'}><button className='mt-4 px-4 py-3 bg-blue-800 text-white rounded hover:border border-blue-800 hover:bg-white hover:text-blue-800'>Back Home</button></Link>
                    </div>
                    <div></div>

                </div>
            </div>

        </>
    )
}

export default Pagenotfound