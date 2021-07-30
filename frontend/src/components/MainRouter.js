import React, {useContext} from 'react'
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import AuthContext from './AuthContextProvider'
import Dashboard from './Dashboard/Dashboard'
import Login from './Login'
import Register from './Register'
import GroupForm from './GroupForm'
import ProtectedRoute from './ProtectedRoute'
import AuthRoute from './AuthRoute'

const MainRouter = () => {

   const {status} = useContext(AuthContext)

    return (
        <Router>
            <Switch>
                <AuthRoute path="/login" component={Login} isAuth={status}/>
                <AuthRoute path="/register" component={Register} isAuth={status}/>
                <ProtectedRoute path="/dashboard" component={Dashboard} isAuth={status}/>
                
                <ProtectedRoute path="/addGroup" component={GroupForm} isAuth={status}/>

            </Switch>
            
        </Router>
    )
}

export default MainRouter
