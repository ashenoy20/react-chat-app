import React from 'react'
import {Route, Redirect} from 'react-router-dom'


const AuthRoute = ({isAuth: status, component: Component, ...rest}) => {
    
    return (
        <Route {...rest} render={(props) => {
            if(status === true){
                return <Redirect to="/dashboard"/>
            }else{
                return <Component/>
            }
        }}/>
    )
}

export default AuthRoute