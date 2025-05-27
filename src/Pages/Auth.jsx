import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { googleoogleLoginApi, LoginApi, registerApi } from '../services/allApi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Auth({ register }) {
    const [showpassword, setShowpassword] = useState(false)

    const [userdetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userdetails)
    const navigate = useNavigate()

    const handleRegister = async () => {
        console.log("inside register")
        const { username, email, password } = userdetails
        if (!username || !email || !password) {
            toast.info("Please fill all details")
        }
        else {

            const result = await registerApi({ username, email, password })
            if (result.status == 200) {
                toast.success("Register Sucessfully")
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else if (result.status == 409) {
                toast.warning(result.response.data)
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
            else {
                toast.error("something went wrong")
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }

        }
    }

    const handleLogin = async () => {
        const { email, password } = userdetails
        if (!email || !password) {
            toast.info("please complete details")
        }
        else {
            const result = await LoginApi({ email, password })
            console.log(result)
            if (result.status == 200) {
                toast.success("Login Sucessfully")
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                if (result.data.existingUser.email == "admin123@gmail.com") {
                    navigate('/admin-home')
                }
                else {
                    navigate('/')
                }

            }
            else if (result.status == 401) {
                toast.warning(result.response.data)
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
            else if (result.status == 404) {
                toast.warning('Account does not exist...')
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
            else {
                toast.error("something went wrong")
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
        }

    }
    const handleGoogleLogin = async (credentialResponse) => {
        const details = jwtDecode(credentialResponse.credential)
        console.log(details)

        const result = await googleoogleLoginApi({ username: details.name, email: details.email, password: 'googlepswd', photo: details.picture })
        console.log(result)
        if (result.status == 200) {
            toast.success("Login Sucessfully")
            sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
            sessionStorage.setItem("token", result.data.token)
            if (result.data.existingUser.email == "admin123@gmail") {
                navigate('/admin-home')
            }
            else {
                navigate('/')
            }
        }
        else {
            toast.error("something went wrobg")
        }
    }


    return (
        <>
            <div id="login" className='flex justify-center items-center'>


                <div className='md:grid grid-cols-3 w-full'>
                    <div></div>
                    <div className='flex justify-center items-center flex-col p-2'>
                        <h3 className='text-3xl mb-5 font-bold text-white '>BOOK STORE</h3>
                        <form className='w-full bg-gray-800 p-10 flex justify-center items-center flex-col' action="">

                            <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='border border-amber-50'>
                                <FontAwesomeIcon icon={faUser} className='text-white ms-5 mt-4 fa-2x' />
                            </div>
                            {!register ? <h1 className='text-white mt-5 mb-8 text-3xl'>Login</h1>
                                : <h1 className='text-white mt-5 mb-8 text-3xl'>Register</h1>}

                            {register && <div className='mb-5 w-full mt-8'>
                                <input type="text" placeholder='Username' className='p-2 rounded placeholder-gray-600 bg-white w-full' onChange={(e) => setUserDetails({ ...userdetails, username: e.target.value })} />
                            </div>}

                            <div className='mb-5 w-full '>
                                <input type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' onChange={(e) => setUserDetails({ ...userdetails, email: e.target.value })} />
                            </div>

                            <div className='mb-2 w-full flex bg-white rounded'>
                                <input type={showpassword ? "text" : "password"} placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' onChange={(e) => setUserDetails({ ...userdetails, password: e.target.value })} />
                                {!showpassword ? <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowpassword(true)} style={{ marginTop: '11px', marginLeft: '30px' }} className='me-2'  /> : <FontAwesomeIcon icon={faEye} onClick={() => setShowpassword(false)} style={{ marginTop: '11px', marginLeft: '30px' }} className='me-2' />}
                            </div>

                            <div className='mb-5 w-full flex justify-between '>
                                <p className='text-amber-400 ' style={{ fontSize: '10px' }}>"Never share password with others"</p>

                                {!register && <p className='text-white underline' style={{ fontSize: '10px' }}>Forgot password</p>}
                            </div>

                            {register ? <div className='w-full mb-2'>
                                <button type='button' className='bg-green-800 text-white w-full p-3 rounded' onClick={handleRegister}>Register</button>
                            </div> :
                                <div className='w-full mb-2'>
                                    <button type='button' onClick={handleLogin} className='bg-green-800 text-white w-full p-3 rounded'>Login</button>
                                </div>}
                            {!register && <p className='text-white'>----------------or-------------</p>
                            }
                            {!register && <div className='mb-2 mt-3 w-full'>
                                {/*<button className='bg-white text-black w-full p-3 rounded'>Sign In with Google</button>*/}
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        handleGoogleLogin(credentialResponse)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');

                                    }}
                                />;
                            </div>}

                            {register ? <p className='text-white'>Are you a already a user? <Link to={'/login'} className='text-blue-600 underline ms-2'>Login</Link></p> :
                                <p className='text-white'>Are you a New user? <Link className='text-blue-600 underline ms-2' to={'/register'}>Register</Link></p>}
                        </form>
                    </div>
                    <div></div>
                </div>

            </div>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default Auth