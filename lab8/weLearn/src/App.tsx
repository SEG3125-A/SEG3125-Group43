/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import './i18n.js'

// Routing library 
import { Route, Routes } from 'react-router-dom'

// Routers for logged in and logged out users
import PublicRoute from './routes/public'
import PrivateRoute from './routes/private'

// Auth context and provider
import { AuthProvider } from './context/auth'

// Page components for the routes
import SignUp from './pages/signup'
import Login from './pages/login'

import Dashboard from './pages/dashboard'
import LandingPage from './pages/landing'

// Main render function
// Could be home page, could be a redirect to a login page, etc.
// Not really anything concrete
function App() {
  return (
    <AuthProvider > 
      {/*Provides user authentication context*/}
      <Routes> {/*Routing wrapper for declared routes */}
          <Route path='/' element={ 
            <PublicRoute>
                <LandingPage />
            </PublicRoute>
          } /> {/*Home page when user isn't logged in. Checks if there is user then redirects to dashboard if yes*/}

          <Route path='/signup' element={ 
           <PublicRoute>
              <SignUp />
           </PublicRoute>
          } /> {/*Signup page when user isn't logged in. Check if there is user then redirects to dashboard if yes*/}

          <Route path='/login' element={ 
            <PublicRoute>
                <Login />
            </PublicRoute>
          } /> {/*Login page when user isn't logged in. Check if there is user then redirects to dashboard if yes*/}

          <Route path='/dashboard' element={ 
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          } /> {/*Dashboard page when user is logged in. Checks if there is user then redirects to login if no*/}
      </Routes>
    </AuthProvider>
  )
}

export default App
