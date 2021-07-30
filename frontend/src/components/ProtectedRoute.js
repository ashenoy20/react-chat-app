import React from 'react'
import {Route, Redirect} from 'react-router-dom'


const ProtectRoute = ({isAuth: status, component: Component, ...rest}) => {
    
    return (
        <Route {...rest} render={(props) => {
            if(status === true){
                return <Component/>
            }else if(status === false){
                return <Redirect to="/login"/>
            }
        }}/>
    )
}

export default ProtectRoute