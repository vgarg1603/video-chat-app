import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import OnboardingPage from './Pages/OnboardingPage'
import Notifications from './Pages/Notifications'
import ChatPage from './Pages/ChatPage'
import CallPage from './Pages/CallPage'
import LoginPage from './Pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore'
import Friends from './Pages/Friends'

function App() {

  const { authUser, isLoading } = useAuthUser();

  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />
  }


  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? <Layout showSidebar={true} ><HomePage /></Layout> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />

        <Route path='/signup' element={!isAuthenticated ? <SignupPage /> : <Navigate to='/' />} />

        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route path='/onboarding' element={isAuthenticated ? (isOnboarded ? <Navigate to={'/'} /> : <OnboardingPage />) : <Navigate to={'/login'} />} /> 

        <Route path='/notifications' element={isAuthenticated ? (isOnboarded ? <Layout showSidebar={true}><Notifications /></Layout> : <OnboardingPage />) : <Navigate to={'/login'} />} />

        <Route path='/chat/:id' element={isAuthenticated && isOnboarded ? <Layout showSidebar={false}><ChatPage /></Layout> :( <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />

        <Route path='/call/:id' element={isAuthenticated && isOnboarded ? <CallPage /> : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} /> )} />

        <Route path='/friends' element={isAuthenticated && isOnboarded ?  <Layout showSidebar={true}><Friends/></Layout> : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)} />

      </Routes>

      <Toaster />
    </div>
  )
}

export default App
