import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoutes from './auth/PrivateRoutes'

import Home from './components/Home'
import Signup from './components/Signup'
import Users from './components/Users'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoutes path="/users" exact component={Users} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
