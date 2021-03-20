import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { isAuthenticated } from '../auth/Auth'

const DashLayout = ({children}) => {
    const role  = isAuthenticated().user.role

    const displayRole = () => {
        if (role === 0) return "Admin"
        else if (role === 1) return "Agent" 
        else return "Customer"
    }

    const displayLinkName = () => {
        if (role === 0) return "All Users"
        else if (role === 1) return "Users" 
        else return "Agents"
    }

    const roleClass = (rol) => {
        if (rol === 0) return "dash-admin"
        else if (rol === 1) return "dash-agent" 
        else return "dash-customer"
    }

    return (
        <div>
            <Layout>
                <div className="">
                    <div className="dashboard">
                        <div className={`dash-left ${roleClass(role)}`}>
                            <div className="role mx-1 my-3">
                                <h5 className="mb-lg-3">Role: {displayRole()}</h5>
                            </div>
                            <div className="links">
                                <ul className="links-list">
                                    <li className="link">
                                        <Link to='/dash'>My Account</Link>
                                    </li>
                                    <li className="link">
                                        <Link to='/loan'>Loans</Link>
                                    </li>
                                    <li className="link">
                                        <Link to='/users'>
                                            {displayLinkName()}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="dash-right">
                            {children}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default DashLayout