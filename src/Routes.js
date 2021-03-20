import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import AdminRoutes from './auth/AdminRoutes'
import AgentRoutes from './auth/AgentRoutes'
import PrivateRoutes from './auth/PrivateRoutes'

import Home from './components/Home'
import Signup from './components/Signup'
import Dash from './components/Dash'
import Loan from './components/Loan'
import Users from './components/Users'
import CreateLoan from './components/CreateLoan'
import UpdateLoan from './components/UpdateLoan'
import ConfirmLoan from './components/ConfirmLoan'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoutes path="/dash" exact component={Dash} />
                <PrivateRoutes path="/loan" exact component={Loan} />
                <PrivateRoutes path="/users" exact component={Users} />
                <AgentRoutes path="/create/loan/:userId" exact component={CreateLoan} />
                <AgentRoutes path="/update/loan/:loanId" exact component={UpdateLoan} />
                <AdminRoutes path="/confirm/loan/:loanId" exact component={ConfirmLoan} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
