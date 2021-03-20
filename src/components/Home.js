import React from 'react'

import Layout from './Layout'
import Signin from './Signin'
import { isAuthenticated } from '../auth/Auth'

const Home = () => {
    return (
        <div>
            <Layout>
                <div className="container pt-5">
                    <div className="row">
                        <div className="col-md-6 offset-lg-3">
                            <div className="signin-col p-5">
                                { isAuthenticated() ? (
                                    <h2 className="m-3"> User already logged In. </h2>
                                ) : (
                                    <Signin />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Home
