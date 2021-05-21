import React from 'react'

import Signin from './Signin'
import { isAuthenticated } from '../auth/Auth'

const Home = () => {
    return (
        <div className="home">
            { isAuthenticated() ? (
                <h2 className="m-3"> User already logged In. </h2>
            ) : (
                <Signin />
            )}
        </div>
    )
}

export default Home
