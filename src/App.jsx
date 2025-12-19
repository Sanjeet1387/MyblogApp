import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import './App.css'

//ab services chahiye then,
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout()) // yani userData nahi mila hai, then user logout hi hai
      }
    })
    .finally(() => setLoading(false))
  })
  
  //conditional rendring
  return !loading ? (
    <div className='min-h-screen flex flex-wrap
    content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* note: this is main issue i found during debugging, due to absent of outlet -> there display the form(login, signup etc) */}
          {/* so this is very very import */}
          TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
