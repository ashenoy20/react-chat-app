import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './MessageBox.css'

const MessageBox = ({displayGroup}) => {

    const [title, setTitle] = useState("")
    const [messages, setMessages] = useState([])


    useEffect(() => {
        async function getGroup() {
            const res = await axios.get(`http://localhost:5000/data/groups/${displayGroup}`, {
                withCredentials: true
            })
            if(res.data){
                setTitle(res.data.title)
                setMessages(res.data.messages)
            }
        }

        getGroup()

    }, [title, messages, displayGroup])
    


    return (
        <div className="message-box">
            <h1 id="chat-title">{title}</h1>
            <div className="textarea">
                {messages}
            </div>
            <form className="message-area">
                <input className="message-input"type="text"/>
                <button className="message-button" type="submit">Send</button>
            </form>
        </div>
    )
}

export default MessageBox
