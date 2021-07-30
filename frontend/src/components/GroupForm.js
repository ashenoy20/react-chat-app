import axios from 'axios'
import React from 'react'
import {useState} from 'react'

const GroupForm = () => {

    const [target, setTarget] = useState("")
    const [title, setTitle] = useState("")

    const createGroup = async (e) => {
        e.preventDefault()
        const group = {
            target,
            title
        }

        await axios.post("http://localhost:5000/data/makeGroup", group, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.replace("/dashboard")
        })
    }


    return ( 
    
            <form onSubmit={createGroup}>
                <label htmlFor="target">Other Username</label>
                <input type="text" name="target" value={target} onChange={e => setTarget(e.target.value)}/>
                <label htmlFor="title">Group Title</label>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)}/>

                <button type="submit">Submit</button>
            </form>
        
    )
}

export default GroupForm