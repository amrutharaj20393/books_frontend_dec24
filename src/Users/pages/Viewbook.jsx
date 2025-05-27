import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { makepaymentApi, viewABookApi } from '../../services/allApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { serverUrl } from '../../services/serverUrl'
import { loadStripe } from '@stripe/stripe-js'
import { ToastContainer } from 'react-toastify'

function Viewbook() {

    const [viewbookdetails, setViewBookDetails] = useState({})
    const [modalstatus, setModalStatus] = useState(false)
    const [token, setToken] = useState("")

    const { id } = useParams()//hook to access data from parameter

    console.log(id)
    const viewABook = async (id) => {
        const result = await viewABookApi(id)
        console.log(result)
        if (result.status == 200) {
            setViewBookDetails(result.data)
        }
    }
    console.log(viewbookdetails)
    const makePayment = async () => {
        console.log(viewbookdetails)
        //object-instance
        const stripe = await loadStripe('pk_test_51RSxz22LjIoQ1c2HuAKfvCfsyoYqO3AfMShsZne9aKylEaDoB8iDVIWnTBF6zRGSOcCPM3zPErr3uxkOGUpIK9XB00iZRhl8e5')

        const reqBody = {
            bookDetails: viewbookdetails

        }
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await makepaymentApi(reqBody, reqHeader)
        console.log(result)
        //console.log(result.data.existingBook)
        const sessionId = result.data.sessionId

        const response = stripe.redirectToCheckout({
            sessionId: sessionId
        })
        if(response.error){
            toast.error('something went wrong')
        }


    }

    useEffect(() => {
        viewABook(id)
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            setToken(token)
        }
    }, [])
    return (
        <>
            <div className=' flex mt-5 justify-end items-end me-10'>
                <FontAwesomeIcon icon={faEye} onClick={() => setModalStatus(true)} />

            </div>

            <div className='ms-10 me-10 mt-20 shadow rounded'>
                <div className='mx-10 my-10 '>

                    <div className='md:grid grid-cols-[1fr_3fr]'>

                        <div className=' px-4'>
                            <img src={viewbookdetails?.imageurl} alt="no image" style={{ height: '350px', width: '500px' }} className='mt-5 mb-5' />

                        </div>
                        <div className='w-full mt-10'>
                            <h2 className='text-2xl text-center text-bold'>{viewbookdetails?.title}</h2>
                            <h2 className='text-blue-500 text-center'>{viewbookdetails?.author}</h2>
                            <div className='flex justify-between mt-3'>
                                <div >
                                    <h3>publisher:{viewbookdetails?.publisher}</h3>
                                </div>
                                <div>Language:{viewbookdetails?.language}</div>
                                <div>No of pages:{viewbookdetails?.noofpage}</div>
                            </div>
                            <div className='flex justify-between mt-5'>
                                <div >
                                    <h3>seller mail:{viewbookdetails?.usermail}</h3>
                                </div>
                                <div>Real price:{viewbookdetails?.price}</div>
                                <div>ISBN:{viewbookdetails?.isbn}</div>
                            </div>
                            <div className='w-full'>
                                <p className='text-justify mt-5'>{viewbookdetails?.abstract}Lorem
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, enim eaque voluptatem voluptas, libero nam commodi animi laborum officiis voluptates perferendis placeat, magni esse similique quis eveniet debitis? Numquam, facere.
                                </p>

                            </div>

                            <div className='flex justify-end mt-4'>
                                <Link to={'/all-Books'}><button className='px-5 py-3 bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border border-blue-600 rounded me-5'>Back</button></Link>
                                <button onClick={makePayment} className='px-5 bg-green-600 text-white hover:bg-white hover:text-green-600 hover:border border-green-600 rounded me-3'>Buy ${viewbookdetails?.dprice}</button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {modalstatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            {/*title */}
                            <div className="bg-gray-900 p-2 flex sm:px-6 justify-between">
                                <h1 className='text-white text-2xl'>Book Modal</h1>
                                <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faXmark} className='text-white fa-2x' />

                            </div>


                            {/*body */}
                            <div className='bg-white px-4 pt-5 pb-4sm:p-6 sm:pb-4'>
                                <h5 className='text-blue-400 ms-2'>Camera click uploaded images</h5>
                                <div className="md:flex my-4">
                                    {
                                        viewbookdetails?.uploadedImg.map((item) => (
                                            <img src={`${serverUrl}/upload/${item}`} className='mt-4 mx-5' alt="" style={{ width: '300px', height: '300px' }} />
                                        ))
                                    }


                                </div>
                            </div>


                            {/*footer of the modal */}
                            <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-500">Submit</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </>
    )
}

export default Viewbook
