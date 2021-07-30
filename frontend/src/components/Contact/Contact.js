import axios from 'axios'
import React from 'react'
import './Contact.css'

const Contact = ({id ,title, focusContact}) => {

    const deleteGroup = async (e) => {
        e.preventDefault()
        await axios.delete('http://localhost:5000/data/deleteGroup', { 
            withCredentials: true,
            data: {id}
        })
    }

    return (
        <div onClick={() => focusContact(id)}>
            <form className="card" onSubmit={deleteGroup}>
                <h1>{title}</h1>
                <button className="delete-button" type="submit">Delete</button>
            </form>
        </div>
    )
}

export default Contact
