import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import OnboardingPage from './Pages/OnboardingPage'
import Notifications from './Pages/Notifications'
import ChatPage from './Pages/ChatPage'
import CallPage from './Pages/CallPage'
import LoginPage from './Pages/LoginPage'
import toast, { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'

function App() {

  const {data: authData, isLoading, isError} = useQuery({
    queryKey: ['authUser'],
    queryFn: async() => {
      const res = await axiosInstance.get('/auth/me');
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;


  return (
    <div className='h-screen' data-theme='night'>
      <Routes>
        <Route path='/' element={authUser ?  <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to='/login' />} />
        <Route path='/notifications' element={authUser ? <Notifications /> : <Navigate to='/login' />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to='/login' />} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
