import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    // userrole 
    let [isUser, setIsUser] = useState((prev) => {
        let token = localStorage.getItem('token')
        if (token) {
            return true
        } else {
            return false
        }
    })
   
    if (!isUser) {
        return <Navigate to='/login' />
    } else {
        
        return <Outlet />
    }

}

export default ProtectedRoute