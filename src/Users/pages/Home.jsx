import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { homeBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextShare'
import { toast, ToastContainer } from 'react-toastify'
function Home() {
    const [homeBook, setHomeBook] = useState([])
    const { searchkey, setSearchKey } = useContext(searchKeyContext)
    const navigate = useNavigate()
    const getAllHomeBook = async () => {
        const result = await homeBookApi()
        console.log(result)
        if (result.status == 200) {
            setHomeBook(result.data)
        }
    }
    const searchBook = () => {
        console.log('inside handle')
        const token = sessionStorage.getItem("token")

        if (searchkey == "") {
            toast.info("please enter title of the book")
        }
        else if (!token) {
            toast.info("please login")
            setTimeout(() => {
                navigate('/login')
            }, 2500)

        }
        else if (searchkey && token) {
            navigate('/all-books')
        }
        else {
            toast.error('something went wrong')
        }
    }
    console.log(homeBook)
    useEffect(() => {
        setSearchKey("")
        getAllHomeBook()
    }, [])
    return (
        <>
            <Header />
            <header className='flex justify-center items-center'>
                <div id="main" className="md:grid grid-cols-3 w-full flex justify-center items-center flex-col">
                    <div></div>
                    <div className='text-white flex justify-center items-center flex-col px-5'>

                        <h1 className='md:text-5xl text-center text-3xl '>Wonderful Gifts</h1>
                        <p className='mt-2 text-center'>Give Your family</p>
                        <div className='flex mt-10 w-full bg-white rounded-2xl '>
                            <input type="text" onChange={(e) => setSearchKey(e.target.value)} placeholder='Search Books' className='py-2 px-4 bg-white rounded-3xl text-black placeholder-gray-500 w-full' />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-blue-800 me-2' style={{ marginTop: '11px', marginLeft: '30px' }} onClick={searchBook} />

                        </div>
                    </div>
                    <div></div>



                </div>



            </header>

            <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
                <h1 className='text-5xl '>New Arrivals</h1>
                <h5 className='text-2xl mt-2'>Explore Our Latest Collection</h5>
                <div className='md:grid grid-cols-4 w-full mt-5'>
                    {
                        homeBook?.length > 0 ?
                            homeBook?.map((item,index) => (
                                <div className='p-3 shadow' key={index}>
                                    <img src={item?.imageurl} alt="" style={{ width: '100%', height: '300px' }} />
                                    <div className='flex  justify-center items-center flex-col ms-3'>
                                        <p className='text-blue-700'>{item?.author}</p>
                                        <h3>{item?.title}</h3>
                                        <p>{item.dprice}</p></div>

                                </div>
                            )) :
                            <p>Loading</p>
                    }

                </div>
                <div className='flex justify-center items-center my-5'>
                    <Link to={'/all-Books'}><button className='px-3 py-2 bg-blue-800 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
                </div>
            </section>

            <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
                <div className='md:grid grid-cols-2 w-full'>
                    <div>
                        <div className='flex justify-center items-center flex-col'>
                            <h3>FEATURED AUTHORS</h3>
                            <h3 className='text-2xl'>Captivates with every word</h3>
                        </div>
                        <p className='text-justify mt-5'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veniam quidem quos placeat modi animi sint pariatur dolore quia dolor quasi hic veritatis harum repellendus, ducimus mollitia nesciunt, ipsa eligendi?Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, modi maxime corrupti explicabo totam harum tempore amet quae unde facilis, ad officia. Quidem modi consectetur tempore alias maiores, eveniet iure!

                        </p>
                        <p className='text-justify mt-5'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium adipisci eveniet cupiditate rerum! Quidem optio et dolorum atque tenetur perspiciatis, rerum animi, quod, velit porro voluptate sit beatae dolorem qui.Lorem
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit nobis ut suscipit odio neque et rem quasi culpa, accusamus aspernatur sint iure labore a minus vitae consequatur vel molestiae error.
                        </p>
                    </div>
                    <div className='px-10 pt-8'>
                        <img src="https://media.gettyimages.com/id/1868371472/photo/atlantic-city-nj-books-successfully-defended-by-martha-hickson-on-december-5-2023-in-atlantic.jpg?s=612x612&w=gi&k=20&c=NZdNM8pStBfFMkyTXofHUGFL11injzZRdoVN8uyLfI4=" alt="" className='w-full' />
                    </div>
                </div>
            </section>
            <div className='flex justify-center items-center flex-col md:mx-40 md:py-10 p-6'>
                <h3>TESTIMONALS</h3>
                <h3 className='text-2xl'>See what others are saying</h3>
                <img src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740" alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} className='mt-5' />
                <p className='mt-3'>Trersa Joseph</p>
                <p className='mt-3 text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, praesentium blanditiis, quasi at quidem a corrupti corporis dolorem aspernatur eaque commodi iusto, modi accusantium hic tempora optio assumenda debitis omnis.Lorem
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, quae veniam. Eligendi cupiditate magnam non voluptate corrupti distinctio fugit, ex, eaque deserunt dolores quasi, cumque nemo totam? Repudiandae, vel aspernatur.
                </p>
            </div>
            <section>

            </section>
            <Footer />
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Home