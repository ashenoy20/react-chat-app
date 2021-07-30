import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import Sidebar from '../Sidebar/Sidebar';
import MessageBox from '../MessageBox/MessageBox';
import './Dashboard.css'


let socket;

const Dashboard = () => {

    const [username, setUsername] = useState("")
    const [focus, setFocus] = useState(null)

    const updateFocus = (id) => {
        setFocus(id)
    }

    const logoutUser = async (e) => {
        e.preventDefault()
        await axios.get('http://localhost:5000/auth/logout', {
            withCredentials: true
        }).then(() => {
            localStorage.removeItem("state")
            document.location.reload()
        })
    }

    const SERVER_URL = "localhost:5000"
 
    useEffect(() => {
        async function getName(state){
            if(state === "true"){
                const res = await axios.get("http://localhost:5000/auth/getUsername", {
                    withCredentials: true
                })
                const {name} = res.data
                setUsername(name)
            }
            
        }
        getName(localStorage.getItem("state"))
        
    }, [username, focus])

    return (
        <>
            <div>
                <h1>{username}</h1> 
                <form onSubmit={logoutUser}>
                    <button type="submit">
                        logout
                    </button>
                </form>
            </div>
            <div className="row">
                <Sidebar clickedContact={updateFocus} state={localStorage.getItem("state")}/>
                <MessageBox displayGroup={focus} state={localStorage.getItem("state")}/>
            </div>
           
        </>
        
    )
}

export default Dashboard
