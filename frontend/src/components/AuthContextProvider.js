import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [status, setStatus] = useState(localStorage.getItem("state") || false)
   

    const getStatus = async () => {
        const isLoggedIn = await axios.get("http://localhost:5000/auth/checkStatus", {
            withCredentials: true
        })
        setStatus(isLoggedIn.data)
        return isLoggedIn.data
    }

    useEffect(() => {
        getStatus().then((value) => {
            localStorage.setItem("state", value)
        })
    }, [])

    return (
        <AuthContext.Provider value={{status}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext
export {AuthContextProvider}
