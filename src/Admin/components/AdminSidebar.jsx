import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { serverUrl } from '../../services/serverUrl'
import { adminprofileupdatestatusContext } from '../../context/ContextShare'

function AdminSidebar() {
    const navigate = useNavigate()
    const [homestatus, setHomeStatus] = useState(false)
    const [bookstatus, setBookStatus] = useState(false)
    const [careersstatus, setCareersStatus] = useState(false)
    const [settingsstatus, setSettingsStatus] = useState(false)
    const [status, setStatus] = useState(false)
    const [admindt, setAdmindt] = useState({
        username: "",
        profile: ""
    })
    const { adminprofileupdatestatus } = useContext(adminprofileupdatestatusContext)
    const filter = (data) => {
        if (data == 'home') {
            navigate('/admin-home')
        }
        else if (data == 'books') {
            navigate('/admin-books')
        }
        else if (data == 'careers') {
            navigate('/admin-careers')
        }
        else if (data == "settings") {
            navigate('/admin-settings')
        }

        else {
            navigate('*')
        }
    }

    useEffect(() => {
        if (location.pathname == '/admin-home') {
            setHomeStatus(true)
        }
        else if (location.pathname == '/admin-books') {
            setBookStatus(true)
        }
        else if (location.pathname == '/admin-careers') {
            setCareersStatus(true)
        }
        else if (location.pathname == '/admin-settings') {
            setSettingsStatus(true)
        }
        else {
            console.log('no such page')
        }

        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setAdmindt({ username: user.username, profile: user.profile })
    }, [adminprofileupdatestatus])
    return (
        <>

            <img className='mt-20  py-5' src={admindt.profile == "" ? "https://cdn-icons-png.flaticon.com/512/3686/3686930.png" : `${serverUrl}/upload/${admindt.profile}`} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <h1 className='mt-4'>{admindt.username}</h1>
            <div className='flex justify-between items-center px-3 md:hidden'>
                <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>
            </div>
            <div className={status ? 'md:flex md:my-3' : 'md:block justify-center my-3 hidden'}>
                <div className='mb-3'>
                    <input type="radio" id='home' name='filter' readOnly checked={homestatus} />
                    <label htmlFor="home" className='ms-3' onClick={() => filter('home')}><FontAwesomeIcon icon={faHouse} />Home</label>
                </div>
                <div className='mb-3'>

                    <input type="radio" id='allbooks' name='filter' readOnly checked={bookstatus} />
                    <label htmlFor="allbooks" className='ms-3' onClick={() => filter('books')}><FontAwesomeIcon icon={faBook} />All Books</label>
                </div>
                <div className='mb-3'  >
                    <input type="radio" name='filter' id='careers' readOnly checked={careersstatus} />
                    <label htmlFor="careers" className='ms-3' onClick={() => filter('careers')}  ><FontAwesomeIcon icon={faBagShopping} />Careers</label>
                </div>
                <div className='mb-3'  >
                    <input type="radio" name='filter' id='settings' readOnly checked={settingsstatus} />
                    <label htmlFor="settings" className='ms-3' onClick={() => filter('settings')}><FontAwesomeIcon icon={faWrench} />Settings</label>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar