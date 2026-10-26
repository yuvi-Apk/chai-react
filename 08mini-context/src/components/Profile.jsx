import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import './Profile.css'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Welcome!</h1>
        <div className="user-info">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Logged In:</strong> {user?.loginTime}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default Profile
