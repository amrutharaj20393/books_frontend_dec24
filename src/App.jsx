import { Profiler, useEffect, useState } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './Users/pages/Home'
import Auth from './Pages/Auth'
import Pagenotfound from './Pages/Pagenotfound'
import Preloader from './components/Preloader'
import AllBooks from './Users/pages/AllBooks'
import Careers from './Users/pages/Careers'
import ContactUs from './Users/pages/ContactUs'
import UserProfile from './Users/pages/UserProfile'
import AdminHome from './Admin/pages/AdminHome'
import AdminBooks from './Admin/pages/AdminBooks'
import AdminCareers from './Admin/pages/AdminCareers'
import AdminSettings from './Admin/pages/AdminSettings'
import Viewbook from './Users/pages/Viewbook'
import PaymentSuccess from './Users/pages/PaymentSuccess'
import PaymentError from './Users/pages/PaymentError'


function App() {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 6000)
  }, [])

  return (
    <>

      <Routes>
        <Route path='/' element={isLoading ? <Home /> : <Preloader />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/all-Books' element={<AllBooks />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/view-book/:id' element={<Viewbook />} />

        <Route path='/admin-home' element={isLoading ? <AdminHome /> : <Preloader />} />
        <Route path='/admin-books' element={<AdminBooks />} />
        <Route path='/admin-careers' element={<AdminCareers />} />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />


        <Route path='*' element={<Pagenotfound />} />
      </Routes>

    </>
  )
}

export default App
