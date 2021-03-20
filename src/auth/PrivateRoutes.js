import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../auth/Auth'

const PrivateRoutes = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render = { props => isAuthenticated() ? (
            <Component {...props} />
          ) : (
              <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
          ) 
        }
    />
)

export default PrivateRoutes
