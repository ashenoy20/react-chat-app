import React from 'react'
import axios from 'axios'

import {useState} from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }

        await axios.post("http://localhost:5000/auth/login", user, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            console.log("Success!")
            document.location.reload()
        }).catch((e) => {
            console.log(e)
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
