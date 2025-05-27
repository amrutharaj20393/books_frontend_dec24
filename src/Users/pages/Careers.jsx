import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { addApplicationApi, getAllJObsApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

function Careers() {
    const [modalstatus, setModalStatus] = useState(false)
    const [allJobs, setAllJobs] = useState([])
    const [searchkey, setSearchKey] = useState("")
    const [applicationdetails, setApplicationDetails] = useState({
        fullname: "",  qualification: "", email: "", phone: "", coverletter: "", resume: ""

    })
    const [jobTitle, setJobTitle] = useState("")
    const [token, setToken] = useState("")
    //console.log(applicationdetails)

    const getAllJobs = async (searchkey) => {
        const result = await getAllJObsApi(searchkey)
        //console.log(result)
        if (result.status == 200) {
            setAllJobs(result.data)
        }
    }
    const handlereset = () => {
        setApplicationDetails({ fullname: "",  qualification: "", email: "", phone: "", coverletter: "", resume: "" })

        //modern browsers wont allow you to set value directly to input tag with file type
        document.getElementById('filetype').value = ""
    }

    const openModal = (jobtitle) => {
        //console.log(jobtitle)
        setModalStatus(true)
        setJobTitle(jobtitle)
    }
    const handlesubmit = async () => {
        console.log(jobTitle)
        const { fullname, email, qualification, coverletter, resume } = applicationdetails
        if (!fullname || !email || !qualification || !coverletter || !resume) {
            toast.info("Please fill all")
        }
        else {
            const reqBody = new FormData()
            for (let key in applicationdetails) {
                reqBody.append(key, applicationdetails[key])
            }
            reqBody.append("jobtitle", jobTitle)

            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const result = await addApplicationApi(reqBody, reqHeader)
            console.log(result)
            if(result.status==200){
                toast.success('Job Applied Successfully')
                setModalStatus(false)
                handlereset()
            }
            else if(result.status==400){
                toast.warning("you have already applied to this job")
                handlereset()
            }
            else{
               toast.error("Something went wrong")
               handlereset() 
            }

        }

    }
    useEffect(() => {
        getAllJobs(searchkey)
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [searchkey])
    return (
        <>
            <Header />
            <div className='flex justify-center items-center flex-col md:px-40 px-10'>
                <h1 className='my-5 text-3xl font-medium'>Careers</h1>
                <p className='md:text-center text-justify '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum nostrum fugit numquam ipsum reprehenderit accusamus voluptatem nihil, maiores quos obcaecati nesciunt voluptatum iste aut? Ratione veritatis consequuntur reprehenderit necessitatibus .Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus tempora architecto, porro illum vitae hic doloribus perspiciatis. Iste, consequuntur ut voluptatem minus dignissimos vero reprehenderit recusandae, quo placeat cum quasi?</p>

            </div>
            <div className='md:p-20 p-5'>
                <h1 className='text-2xl' >Current Openings</h1>
                <div className='flex  justify-center items-center my-8 w-full'>
                    <input type="text" value={searchkey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Job Title' className=' p-2  border shadow border-black placeholder-gray-600 bg-white md:w-1/4  w-1/2' />

                    <button className='bg-green-800 text-white  py-2 px-3 hover:border border-green-600 hover:text-green-600 hover:bg-white' >Search</button>
                </div>

                <div className='md:px-20 py-5 '>
                    {allJobs?.length > 0 ?
                        allJobs?.map((item, index) => (<div className='shadow border border-gray-300 ' key={index}>
                            <div className="md:grid grid-cols-[8fr_1fr] p-5">
                                <div  >
                                    <h1>{item?.title}</h1>
                                    <hr />
                                    <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='text-blue-500 me-2' />{item?.location}</p>
                                    <p className='mt-3'>Job Type:{item?.Jtype}</p>
                                    <p className='mt-3'>Salary:{item?.salary}</p>
                                    <p className='mt-3'>Qualification:{item?.qualification}</p>
                                    <p className='mt-3'>Experience:{item?.experience}</p>
                                    <p className='mt-2 text-justify'>Description:{item?.description}
                                    </p>

                                </div>
                                <div className='flex md:justify-center items-start justify-end'>
                                    <button onClick={() => openModal(item?.title)} className='bg-blue-800 text-white p-3 rounded ms-3 hover:bg-white hover:border border-blue-500 hover:text-blue-600'>Apply</button>
                                </div>
                            </div>
                        </div>)) : <p>No jobs</p>}
                </div>
            </div>


            {modalstatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            {/*title */}
                            <div className="bg-gray-900 p-4 flex sm:px-6 justify-between">
                                <h1 className='text-white text-2xl'>Application Form</h1>
                                <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faXmark} className='text-white fa-2x' />
                            </div>

                            {/*body */}
                            <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                <div className='grid grid-cols-2'>
                                    <div className='p-3'>
                                        <div className="mb-3">
                                            <input value={applicationdetails.fullname} onChange={(e) => { setApplicationDetails({ ...applicationdetails, fullname: e.target.value }) }} type="text" placeholder='Full Name' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>

                                        <div className="mb-3">
                                            <input value={applicationdetails.email} onChange={(e) => { setApplicationDetails({ ...applicationdetails, email: e.target.value }) }} type="text" placeholder='Email Id' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <div className="mb-3">
                                            <input value={applicationdetails.qualification} onChange={(e) => { setApplicationDetails({ ...applicationdetails, qualification: e.target.value }) }} type="text" placeholder='Qualifiaction' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                        </div>
                                        <div className="mb-3">
                                            <input value={applicationdetails.phone} onChange={(e) => { setApplicationDetails({ ...applicationdetails, phone: e.target.value }) }} type="text" placeholder='Phone' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 px-3 w-full">
                                    <textarea value={applicationdetails.coverletter} onChange={(e) => { setApplicationDetails({ ...applicationdetails, coverletter: e.target.value }) }} placeholder='Cover Letter' className='p-2 border border-gray-500 rounded placeholder-gray-500 w-full'></textarea>
                                </div>
                                <div className="mb-3 px-3 w-full">
                                    <p className='text-gray-500'>Resume</p>
                                    <input id="filetype" onChange={(e) => { setApplicationDetails({ ...applicationdetails, resume: e.target.files[0] }) }} type="file" className=' border border-gray-500 rounded placeholder-gray-500  w-full file:bg-gray-400 file:p-2 file:text-white' />
                                </div>
                            </div>

                            {/*footer of the modal */}
                            <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handlesubmit} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-500">Submit</button>
                                <button onClick={handlereset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}


            <Footer />
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Careers