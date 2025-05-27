import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { addJobApi, deleteJobApi, getAllApplicationsApi, getAllJObsApi } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'

function AdminCareers() {
    const [allcareersstatus, setAllCarrersStatus] = useState(true)
    const [applicantstatus, setApplicantStatus] = useState(false)
    const [modalstatus, setModalStatus] = useState(false)
    const [addJobstatus, setAddJobStatus] = useState({})
    const [searchkey, setSearchKey] = useState("")
    const [deleteJobStatus, setDeleteJobStatus] = useState({})
    const [jobdetails, setJobDetails] = useState({
        title: "",
        location: "",
        jtype: "",
        salary: "",
        qualification: "",
        experience: "",
        description: ""
    })

    const [allJob, setAllJobs] = useState([])
    const [allApplication, setAllApplication] = useState([])
    const handleReset = () => {
        setJobDetails({
            title: "",
            location: "",
            jtype: "",
            salary: "",
            qualification: "",
            experience: "",
            description: ""
        })
    }
    const handleAddJb = async () => {
        console.log("inside register")
        const { title, location, jtype, salary, qualification, experience, description } = jobdetails
        if (!title || !location || !jtype || !salary || !qualification || !experience || !description) {
            toast.info("Please fill all details")
        }
        else {
            const result = await addJobApi({ title, location, jtype, salary, qualification, experience, description })
            // console.log(result)
            if (result.status == 200) {
                toast.success("Job Addede Sucessfully")
                setJobDetails({
                    title: "",
                    location: "",
                    jtype: "",
                    salary: "",
                    qualification: "",
                    experience: "",
                    description: ""
                })
                setModalStatus(false)
                setAddJobStatus(result.data)
            }
            else if (result.status == 400) {
                toast.warning(result.response.data)
                setJobDetails({
                    title: "",
                    location: "",
                    jtype: "",
                    salary: "",
                    qualification: "",
                    experience: "",
                    description: ""
                })
            }
            else {
                toast.error("something went wrong")
                setJobDetails({
                    title: "",
                    location: "",
                    jtype: "",
                    salary: "",
                    qualification: "",
                    experience: "",
                    description: ""
                })
            }
        }
    }
    const getAllJobs = async (searchkey) => {
        const result = await getAllJObsApi(searchkey)
        // console.log(result)
        if (result.status == 200) {
            setAllJobs(result.data)

        }
    }

    const deleteJob = async (id) => {
        const result = await deleteJobApi(id)
        console.log(result)
        if (result.status == 200) {
            setDeleteJobStatus(result)
        }
    }
    //  console.log(allJob)

    const getAllApplications = async () => {
        const result = await getAllApplicationsApi()
        console.log(result)
        if (result.status == 200) {
            setAllApplication(result.data)
        }
    }
    console.log(allApplication)
    useEffect(() => {
        if (allcareersstatus == true) {
            getAllJobs(searchkey)
        }
        else if (applicantstatus == true) {
            getAllApplications()
        }


    }, [addJobstatus, searchkey, deleteJobStatus, allcareersstatus, applicantstatus])
    return (
        <>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex  flex-col items-center p-5'>
                    <AdminSidebar />
                </div>
                <div>
                    <h1 className='text-center text-2xl mt-3'>Careers</h1>
                    <div className='md:mx-15 mt-5 mx-5'>
                        <div className='flex justify-center items-center'>
                            <p onClick={() => { setAllCarrersStatus(true); setApplicantStatus(false); }} className={allcareersstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'}>Job Post</p>

                            <p onClick={() => { setAllCarrersStatus(false); setApplicantStatus(true); }} className={applicantstatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 cursor-pointer' : 'p-4 text-black border-b border-gray-300 cursor-pointer'} >View Applicant</p>
                        </div>
                        {allcareersstatus &&

                            <div className=' mt-10 '>
                                <div className='flex justify-between'>
                                    <div className='flex md:w-100'>
                                        <input type="text" value={searchkey} onChange={(e) => setSearchKey(e.target.value)} placeholder='search' className='border md:h-10   md:w-full w-50 placeholder-gray-200 ' /><button className='text-white bg-green-800 md:p-2 ' >Search</button>
                                    </div>
                                    <div>
                                        <div>
                                            <button onClick={() => setModalStatus(true)} className='bg-blue-800 text-white p-2 rounded ms-3 hover:bg-white hover:border border-blue-500 hover:text-blue-600'>Add Job</button>
                                        </div>

                                        {modalstatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                                            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                        {/*title */}
                                                        <div className="bg-gray-900 p-4 flex sm:px-6 justify-between">
                                                            <h1 className='text-white text-2xl'>Add Job</h1>
                                                            <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faXmark} className='text-white fa-2x' />
                                                        </div>

                                                        {/*body */}
                                                        <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                                            <div className='grid grid-cols-2'>
                                                                <div className='p-3'>
                                                                    <div className="mb-3">
                                                                        <input onChange={(e) => setJobDetails({ ...jobdetails, title: e.target.value })} type="text" value={jobdetails.title} placeholder='Job Title' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <input value={jobdetails.location} onChange={(e) => setJobDetails({ ...jobdetails, location: e.target.value })} type="text" placeholder='Location' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <input value={jobdetails.jtype} onChange={(e) => setJobDetails({ ...jobdetails, jtype: e.target.value })} type="text" placeholder='Job Type' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                                                    </div>
                                                                </div>
                                                                <div className='p-3'>
                                                                    <div className="mb-3">
                                                                        <input value={jobdetails.qualification} onChange={(e) => setJobDetails({ ...jobdetails, qualification: e.target.value })} type="text" placeholder='Qualifiaction' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <input value={jobdetails.salary} onChange={(e) => setJobDetails({ ...jobdetails, salary: e.target.value })} type="text" placeholder='Salary' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <input value={jobdetails.experience} onChange={(e) => setJobDetails({ ...jobdetails, experience: e.target.value })} type="text" placeholder='Experience' className='p-2 border border-gray-400 rounded placeholder-gray-500  w-full' />
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <div className="mb-3 px-3 w-full">
                                                                <textarea value={jobdetails.description} onChange={(e) => setJobDetails({ ...jobdetails, description: e.target.value })} placeholder='Abstract' className='p-2 border border-gray-500 rounded placeholder-gray-500 w-full'></textarea>
                                                            </div>

                                                        </div>

                                                        {/*footer of the modal */}
                                                        <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button onClick={handleAddJb} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-500">Add Job</button>
                                                            <button onClick={handleReset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black">Reset</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}

                                    </div>

                                </div>


                                {allJob?.length > 0 ?

                                    allJob?.map((item, index) => (<div className='mt-5 shadow border border-gray-300 mb-5 ' key={index}>
                                        <div className="md:grid grid-cols-[8fr_1fr] md:p-3 p-2">
                                            <div>
                                                <h1 className='font-semibold'>{item?.title}</h1>
                                                <hr />
                                                <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='text-blue-500 me-2' />{item?.location}</p>
                                                <p className='mt-3'>Job Type:{item?.jtype}</p>
                                                <p className='mt-3'>Salary:{item?.salary}</p>
                                                <p className='mt-3'>Qualification:{item?.qualification}</p>
                                                <p className='mt-3'>Experience:{item?.experience}</p>
                                                <p className='mt-2 text-justify'>Description:{item?.description}
                                                </p>

                                            </div>
                                            <div className='flex md:justify-center items-start justify-end mt-3'>
                                                <button onClick={() => deleteJob(item?._id)} className='bg-red-800 text-white p-3 rounded ms-3 hover:bg-white hover:border border-red-500 hover:text-red-600'>Delete<FontAwesomeIcon icon={faTrash} className='ms-2  hover:text-red-600' /></button>
                                            </div>
                                        </div>
                                    </div>)) : <p>No books</p>}

                            </div>

                        }
                        {applicantstatus &&
                            <div className='md:px-10 overflow-x-auto'>

                                {allApplication?.length > 0 ?
                                    <table className='w-full border border-gray-900 shadow-2xl mt-5'>
                                        <thead>
                                            <tr>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Sl</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Job Title</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Name</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Qualification</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Email</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Phone</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Cover Letter</th>
                                                <th className='border border-gray-900 p-2 bg-blue-500'>Resume</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allApplication?.map((item, index) => (<tr key={index}>
                                                <td className='text-center border border-gray-500 p-2'>{index + 1}</td>
                                                <td className='text-center border border-gray-500 p-2'>{item?.jobtitle}</td>
                                                <td className='text-center border border-gray-500 p-2'>{item?.fullname}</td>

                                                <td className='text-center border border-gray-500 p-2'>{item?.qualification}</td>
                                                <td className='text-center border border-gray-500 p-2'>{item?.email}</td>
                                                <td className='text-center border border-gray-500 p-2'>{item?.phone}</td>
                                                <td className='text-center border border-gray-500 p-2'>{item?.coverletter}</td>
                                                <td className='text-center border border-gray-500 p-2'><Link to={`${serverUrl}/pdfuploads/${item?.resume}`} target='_blank' className='text-blue-400 underline'>Resume</Link></td>

                                            </tr>))}
                                        </tbody>
                                    </table> : <p>No Data...........</p>
                                }
                            </div>

                        }

                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default AdminCareers