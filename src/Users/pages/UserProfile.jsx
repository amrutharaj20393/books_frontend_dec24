import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import EditProfile from './EditProfile'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { uploadBookApi } from '../../services/allApi'
import { getAllUserBroughtBookApi, getAllUserBookApi, deleteUserBookApi } from '../../services/allApi'
import { ToastContainer } from 'react-toastify'
import { serverUrl } from '../../services/serverUrl'
import { userprofileupdatestatusContext } from '../../context/ContextShare'

function UserProfile() {
    const [sellstatus, setSellStatus] = useState(true)
    const [bookstatus, setBookStatus] = useState(false)
    const [purchasestatus, setPurchaseStatus] = useState(false)
    const [bookdetails, setBookDetails] = useState({
        title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "",
        uploadedImages: []
    })
    const [preview, setPreview] = useState("")
    const [previewlist, setPreviewList] = useState([])
    const [token, setToken] = useState("")
    const [userBook, setUserBook] = useState([])
    const [userBroughtBook, setUserBroughtBook] = useState([])
    const [deleteBookStatus, setDeleteBookStaus] = useState("")

  const [userdt, setUserdt] = useState({
        username: "",
        profile: ""
    })

    const {userprofileupdatestatus}=useContext(userprofileupdatestatusContext)

    const handleUpload = (e) => {
        // console.log(e.target.files[0])
        const fileArray = bookdetails.uploadedImages
        fileArray.push(e.target.files[0])
        setBookDetails({ ...bookdetails, uploadedImages: fileArray })
        const url = URL.createObjectURL(e.target.files[0])//to convert object to image url
        console.log(url)
        setPreview(url)

        const newArray = previewlist
        newArray.push(url)
        setPreviewList(newArray)

    }
    const handleReset = () => {
        setBookDetails({
            title: "", author: "", noofpages: "", imageurl: "", price: "", dprice: "", abstract: "", publisher: "", language: "", isbn: "", category: "",
            uploadedImages: []

        })
        setPreview("")
        setPreviewList([])
    }

    const handleSubmit = async () => {
        const {
            title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category,
            uploadedImages } = bookdetails

        if (!title || !author || !noofpages || !imageurl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || uploadedImages.length == 0) {
            toast.info("Please fill all details")
        }
        else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const reqBody = new FormData()//the data from the frontend which is having uploaded content should be send in the form of form data
            for (let key in bookdetails) {
                if (key != 'uploadedImages') {
                    reqBody.append(key, bookdetails[key])
                }
                else {
                    bookdetails.uploadedImages.forEach((item) => {
                        reqBody.append("uploadedImages", item)
                    })
                }

            }
            console.log(reqBody)
            console.log(reqHeader)
            const result = await uploadBookApi(reqBody, reqHeader)
            console.log(result)


            if (result.status == 401) {
                toast.warning("you have already added book")
                handleReset()
            }
            else if (result.status == 200) {
                toast.success("Book Added Successfully")
                handleReset()
            }
            else {
                toast.error("Something went wrong")
                handleReset()
            }


        }
    }

    const getallUserBook = async () => {

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }

        const result = await getAllUserBookApi(reqHeader)
        console.log(result)
        if (result.status == 200) {
            setUserBook(result.data)
        }
    }
    const getallUserBroughtBook = async () => {

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }

        const result = await getAllUserBroughtBookApi(reqHeader)
        console.log(result)
        if (result.status == 200) {
            setUserBroughtBook(result.data)
        }
    }


    const deleteBook = async (id) => {
        const result = await deleteUserBookApi(id)
        console.log(result)
        setDeleteBookStaus(result.data)

    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserdt({ username: user.username, profile: user.profile })
           
        }
        if (bookstatus == true) {
            getallUserBook()
        }
        else if (purchasestatus == true) {
            getallUserBroughtBook()
        }
        else {
            console.log('went wrong')
        }
    }, [bookstatus,deleteBookStatus,userprofileupdatestatus])
   
   

   
    return (
        <>
            <Header />
            <div style={{ height: '300px' }} className='bg-gray-900'></div>
            <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }} className='bg-white-900 p-3'>
                <img src={userdt.profile==""?"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=": `${serverUrl}/upload/${userdt.profile}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            </div>
            <div className='md:flex justify-between px-20 mt-5'>
                <p >
                    <span className='md:text-3xl text-2xl ms-3'>{userdt.username}</span>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-blue-400' />
                </p>

                <EditProfile />

            </div>
            <p className='md:px-20 px-5 py-5 text-justify mt-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, molestias adipisci quam, velit eaque architecto excepturi vero nisi modi est in aperiam doloremque alias mollitia perspiciatis iure totam fuga. Incidunt!Lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente voluptatem, odit aliquam est reprehenderit veritatis hic asperiores iste assumenda voluptates iusto animi rerum, eius facilis fugiat molestiae alias aperiam adipisci.

            </p>

            <div className='md:px-20'>
                {/**tabs */}
                <div className='flex justify-center items-center my-5'>
                    <p onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }} className={sellstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'}>Sell Book</p>

                    <p onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }} className={bookstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'} >Book Status</p>

                    <p onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }} className={purchasestatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'}>Purchase History</p>

                </div>

                {/**content */}
                {sellstatus &&
                    <div className='p-10 mt-20 my-20  bg-gray-100 shadow-2xl rounded'>
                        <h3 className='text-center text-3xl font-medium'>Book Details</h3>
                        <div className='md:grid grid-cols-2 mt-5 w-full'>


                            <div className='px-3'>
                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, title: e.target.value })} value={bookdetails.title} type="text" placeholder='Title' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, author: e.target.value })} value={bookdetails.author} type="text" placeholder='Author' className='p-2 border border-gray-200 rounded placeholder-gray-300   bg-white w-full' />
                                </div>


                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, noofpages: e.target.value })} value={bookdetails.noofpages} type="text" placeholder='No of pages' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className="mb-3  w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, imageurl: e.target.value })} type="text" value={bookdetails.imageurl} placeholder='Image url' className='p-2 border border-gray-200 rounded placeholder-gray-300   bg-white w-full' />
                                </div>


                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, price: e.target.value })} type="text" value={bookdetails.price} placeholder='Price' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className="mb-3  w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, dprice: e.target.value })} type="text" value={bookdetails.dprice} placeholder='Discount price' className='p-2 border border-gray-200 rounded placeholder-gray-300   bg-white w-full' />
                                </div>


                                <div className="mb-3 w-full">
                                    <textarea rows={5} onChange={(e) => setBookDetails({ ...bookdetails, abstract: e.target.value })} type="text" value={bookdetails.abstract} placeholder='Abstract' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                            </div>

                            <div className='px-3'>
                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, publisher: e.target.value })} type="text" value={bookdetails.publisher} placeholder='Publisher' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, language: e.target.value })} type="text" value={bookdetails.language} placeholder='Language' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, isbn: e.target.value })} type="text" value={bookdetails.isbn} placeholder='HSBN' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className="mb-3 w-full">
                                    <input onChange={(e) => setBookDetails({ ...bookdetails, category: e.target.value })} type="text" value={bookdetails.category} placeholder='Category' className='p-2 border border-gray-200 rounded placeholder-gray-300 bg-white w-full' />
                                </div>
                                <div className='mb-3 flex justify-center items-center mt-3 w-full'>
                                    {!preview ? <label htmlFor="imagefile">
                                        <input id="imagefile" type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" alt=" no image" style={{ width: '200px', height: '200px' }} /></label>
                                        : <img src={preview} alt=" no image" style={{ width: '200px', height: '200px' }} />
                                    }

                                </div>
                                {preview && <div className='flex justify-center items-center'>
                                    {previewlist?.map((item) => (
                                        <img src={item} alt="no image" style={{ width: '70px', height: '70px' }} className='mx-3' />

                                    ))}

                                    {previewlist?.length < 3 && <label htmlFor="imagefile">
                                        <input id="imagefile" type="file" style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                                        <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-gray-500 ' /></label>}


                                </div>}
                            </div>



                        </div>
                        <div className='flex justify-end mt-3'>
                            <button onClick={handleReset} className='p-2 bg-amber-400 text-black rounded w-30 hover:bg-white hover:text-amber-600 hover:border border-amber-400'>Reset</button>
                            <button onClick={handleSubmit} className=' p-2 ms-3 bg-green-600 text-white rounded w-30  hover:bg-white hover:text-green-600 hover:border border-green-400'>Submit</button>
                        </div>

                    </div>}

                {bookstatus && <div className='p-10 my-20 shadow rounded'>
                    {userBook.length > 0 ?
                        userBook?.map((item,index) => (<div className='bg-gray-200 p-5 rounded' key={index}>
                            <div className='md:grid grid-cols-[3fr_1fr]'>
                                <div className='px-4'>
                                    <h3 className='text-2xl'>{item?.title}</h3>
                                    <h2>{item?.author}</h2>
                                    <h3 className='text-blue-500'>${item?.dprice}</h3>
                                    <p className='text-justify'>{item?.abstract}</p>
                                    <div className='flex mt-3'>
                                        {item?.status == 'pending' ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFk7u3bD_LY6zJMkCKev7E8EU34OK3US0SPg&s" alt="no image" style={{ width: '70px', height: '70px' }} /> :
                                            item?.status == 'approved' ? <img src="https://media.istockphoto.com/id/1219181841/vector/approved-stamp.jpg?s=612x612&w=0&k=20&c=Ob1oClnS4284pvOSe6pslEQ4NF0MlOUIyslD9WfshtU=" alt="no image" style={{ width: '70px', height: '70px' }} /> :
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSBQggHc0kFIliAE-3ccFCfTDU3lRwFJgqZA&s" alt="no image" style={{ width: '70px', height: '70px' }} />}
                                    </div>
                                </div>
                                <div className='px-4'>
                                    <img src={item?.imageurl} alt="no image" className='w-full' style={{ height: '250px' }} />

                                    <div className='flex justify-end mt-4'>
                                        <button onClick={()=>deleteBook(item?._id)} className='p-2 bg-red-600 text-white hover:bg-white hover:text-red-600 hover:border border-red-600 rounded'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>)) :

                        <div className='flex justify-center items-center flex-col'>
                            <img src="https://usagif.com/wp-content/uploads/gifs/book-69.gif" alt="" style={{ width: '200px', height: '200px' }} />
                            <p className='text-red-600 text-2xl'>No Book Added Yet</p>
                        </div>}
                </div>}

                {purchasestatus && <div className='p-10 my-20 shadow rounded'>
                  {userBroughtBook?.length>0? 
                  userBroughtBook?.map((item,index) => (<div className='bg-gray-200 p-5 rounded' key={index}>
                    <div className='md:grid grid-cols-[3fr_1fr]'>
                        <div className='px-4'>
                            <h3 className='text-2xl'>{item?.title}</h3>
                            <h2>{item?.author}</h2>
                            <h3 className='text-blue-500'>${item?.dprice}</h3>
                            <p className='text-justify'>{item?.abstract}</p>
                            <div className='flex mt-3'>
                                {item?.status == 'pending' ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFk7u3bD_LY6zJMkCKev7E8EU34OK3US0SPg&s" alt="no image" style={{ width: '70px', height: '70px' }} /> :
                                    item?.status == 'approved' ? <img src="https://media.istockphoto.com/id/1219181841/vector/approved-stamp.jpg?s=612x612&w=0&k=20&c=Ob1oClnS4284pvOSe6pslEQ4NF0MlOUIyslD9WfshtU=" alt="no image" style={{ width: '70px', height: '70px' }} /> :
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSBQggHc0kFIliAE-3ccFCfTDU3lRwFJgqZA&s" alt="no image" style={{ width: '70px', height: '70px' }} />}
                            </div>
                        </div>
                        <div className='px-4'>
                            <img src={item?.imageurl} alt="no image" className='w-full' style={{ height: '250px' }} />

                           
                        </div>
                    </div>
                </div>)) 
                  

                    :<div className='flex justify-center items-center flex-col'>
                        <img src="https://usagif.com/wp-content/uploads/gifs/book-69.gif" alt="" style={{ width: '200px', height: '200px' }} />
                        <p className='text-red-600 text-2xl'>No Book purchased Yet</p>
                    </div>}
                </div>}
            </div>

            <Footer />
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default UserProfile