import React, {useEffect, useState} from 'react'
import Contact from '../Contact/Contact'
import axios from 'axios'
import './Sidebar.css'

const Sidebar = ({clickedContact}) => {

    const [list, setList] = useState([])


    useEffect(() => {
        
        async function getList(){
            const res = await axios.get('http://localhost:5000/data/getGroups', {
                withCredentials: true
            })
            const groups = res.data
            const newList = []
            for(let group of groups){
                newList.push(<Contact focusContact={clickedContact} id={group._id} key={group._id} title={group.title}/>)
            }
            setList(newList)
        }

        getList()
    }, [list])


    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Sidebar</h1>
            {list}
        </div>
    )
}

export default Sidebar
