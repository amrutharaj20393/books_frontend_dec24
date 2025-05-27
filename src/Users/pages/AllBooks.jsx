import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { getAllBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextShare'

function AllBooks() {
    const [status, setStatus] = useState(false)
    const [token, setToken] = useState("")
    const [allBooks, setAllBooks] = useState([])
    const [tempArray, setTempArray] = useState([])
    const {searchkey, setSearchKey}= useContext(searchKeyContext)
    console.log(searchkey)

    const getAllBooks = async (searchkey,tok) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        }
        const result = await getAllBookApi(searchkey,reqHeader)
        console.log(result)
        if (result.status == 200) {
            setAllBooks(result.data)
            setTempArray(result.data)
        }
    }
    console.log(allBooks)
    console.log(tempArray)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
            getAllBooks(searchkey,tok)
        }
    }, [searchkey])

    const filter = (data) => {
        if (data == 'no-filter') {
            setAllBooks(tempArray)
        }
        else {
            setAllBooks(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
        }


    }
    return (

        <>
            <Header />
            {/*when user login */}
            {token && <div>
                <div className='flex justify-center items-center flex-col'>
                    <h2 className='text-center text-4xl mt-5 font-medium'>Collections</h2>
                    <div className='flex  justify-center items-center my-8 w-full'>
                        <input type="text" value={searchkey} onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search By Title' className=' p-2  border shadow border-black placeholder-gray-600 bg-white md:w-1/4  w-1/2' />

                        <button className='bg-blue-800 text-white  py-2 px-3 hover:border border-blue-600 hover:text-blue-600 hover:bg-white' >Search</button>
                    </div>
                </div>
                <div className='md:grid grid-cols-[1fr_4fr] md:py-10 md:px-20 px-5'>
                    <div>
                        <div className='flex mt-3 justify-between' ><h3 className='text-2xl font-medium '>Filters</h3>
                            <span onClick={() => setStatus(!status)} className='md:hidden'><FontAwesomeIcon icon={faBars} /></span>
                        </div>
                        <div className={status ? 'md:block' : 'md:block justify-center hidden'}>
                            <div className='mt-3' onClick={() => filter("Literary")}>
                                <input type="radio" id="Literary" name='filter' />
                                <label htmlFor="Literary" className="ms-3">Literary Fiction </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Philosaphy")}>
                                <input type="radio" id="Philosaphy" name='filter' />
                                <label htmlFor="Philosaphy" className="ms-3">Philosaphy </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Romance")}>
                                <input type="radio" id="Romance" name='filter' />
                                <label htmlFor="Romance" className="ms-3">Romance </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Horror")}>
                                <input type="radio" id="Horror" name='filter' />
                                <label htmlFor="Horror" className="ms-3">Horror </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Auto/Biography")}>
                                <input type="radio" id="Auto/Biography" name='filter' />
                                <label htmlFor="Auto/Biography" className="ms-3">Auto/Biography </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Self-Help")}>
                                <input type="radio" id="Self-Help" name='filter' />
                                <label htmlFor="Self-Help" className="ms-3">Self-Help </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("Politics")}>
                                <input type="radio" id="Politics" name='filter' />
                                <label htmlFor="Politics" className="ms-3">Politics </label>
                            </div>
                            <div className='mt-3' onClick={() => filter("no-filter")}>
                                <input type="radio" id="no-filter" name='filter' />
                                <label htmlFor="no-filter" className="ms-3">No filter </label>
                            </div>
                        </div>
                    </div>

                    <div className='md:grid grid-cols-4 w-full mt-5'>
                        {
                            allBooks?.length > 0 ?
                                allBooks?.map((item,index) => (
                                    <div className='p-3 shadow' hidden={item?.status=='pending'||item?.status=='sold'} key={index}>
                                        <img src={item?.imageurl} alt="" style={{ width: '100%', height: '300px' }} />
                                        <div className='flex  justify-center items-center flex-col ms-3'>
                                            <p className='text-blue-700'>{item?.author.slice(0, 20)}...</p>
                                            <h3>{item?.title.slice(0, 20)}....</h3>
                                            <Link to={`/view-book/${item?._id}`}><button className='w-full px-3 py-2 mt-3 bg-blue-800 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>View Book</button></Link>
                                        </div>

                                    </div>
                                )) :
                                <p>No Books</p>
                        }

                    </div>

                </div>
            </div>}

            {/*when user not login */}
            {!token && <div className='grid grid-cols-3 py-10'>
                <div></div>

                <div className='flex justify-center items-center flex-col w-full'>
                    <img src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif" alt="" />
                    <p className='mt-3 text-2xl'>Please <Link to={'/login'} className='text-red-600 underline'>Login</Link> To explore more</p>
                </div>
                <div></div>
            </div>}
            <Footer />

        </>
    )
}

export default AllBooks