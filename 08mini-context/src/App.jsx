import React, { useContext } from 'react'
import UserContextProvider from './context/UserContextProvider'
import UserContext from './context/UserContext'
import Login from './components/Login'
import Profile from './components/Profile'

const AppContent = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      {user && user.isLoggedIn ? <Profile /> : <Login />}
    </div>
  )
}

const App = () => {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  )
}

export default App
