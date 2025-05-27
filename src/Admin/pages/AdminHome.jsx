import React from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUser, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function AdminHome() {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]

    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];
    return (
        <>
            <AdminHeader />
            <div className='md:grid grid-cols-[1fr_4fr]'>
                <div className='bg-blue-100 flex  flex-col items-center p-5'>
                    <AdminSidebar />
                </div>
                <div className='p-10'>
                    <div className='md:grid grid-cols-3'>
                        <div className=' px-5 py-5 md:py-0'>
                            <div className=' bg-blue-600 p-4 flex rounded text-white'>
                                <FontAwesomeIcon icon={faBook} className='fa-3x' />

                                <div className='text-center px-5'>
                                    <h1 className='text-lg text-center'>Total Number Of Books</h1 >
                                    <h1 className='text-3xl'>100+</h1>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5  py-5 md:py-0'>
                            <div className=' bg-green-600 p-4 flex rounded text-white'>
                                <FontAwesomeIcon icon={faUsers} className='fa-3x' />

                                <div className='text-center px-5'>
                                    <h1 className='text-lg text-center'>Total Number Of Users</h1 >
                                    <h1 className='text-3xl'>100+</h1>
                                </div>
                            </div>
                        </div>
                        <div className=' px-5  py-5 md:py-0'>
                            <div className=' bg-amber-600 p-4 flex rounded text-white'>
                                <FontAwesomeIcon icon={faUserTie} className='fa-2x' />

                                <div className='text-center px-5'>
                                    <h1 className='text-lg text-center'>Total Number Of Employees</h1 >
                                    <h1 className='text-3xl'>100+</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:grid grid-cols-2'>
                        <div className='mt-5'>
                            <div className='w-full h-80'>
                                <ResponsiveContainer width='100%' height='100%'>{/*to make the barchart responsive with parent tag */}
                                    <BarChart width={530} height={250} data={data}>{/*indicate the chart//data-attribute=>hold the data to be displayed */}
                                        <CartesianGrid strokeDasharray="3 3" />{/*grid dash -3px 3px gap */}
                                        <XAxis dataKey="name" />{/*represent x axis */}
                                        <YAxis />{/**represent yaxis */}
                                        <Tooltip />{/** indicate the data-squre*/}
                                        <Legend />{/** data fetch with the help of legand*/}
                                        <Bar dataKey="pv" fill="#8884d8" />{/** */}
                                        <Bar dataKey="uv" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>


                        </div>
                        <div>
                            <div className='w-full h-80'>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <PieChart width={730} height={250}>
                                        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />{/** it places cx-horizonal cy-vertical  */}
                                        <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                    </PieChart>
                                </ResponsiveContainer>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default AdminHome

