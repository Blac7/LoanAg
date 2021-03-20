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
                        <div className="col-lg-6 col-md-12 log-box">
                            <div className="login_password mb-5">
                                <h5 className="mb-3">Samples Logins</h5>
                                <p>Each role has different features</p>
                                <p>Admin: al@pha.com alpha1</p>
                                <p>Agent: be@ta.com beta@2</p>
                                <p>Customer: ga@ma.com gama@3</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="signin-col p-5 mb-5">
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
