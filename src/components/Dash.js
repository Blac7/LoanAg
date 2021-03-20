import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import DashLayout from './DashLayout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const Dash = () => {
    const [user, setUser] = useState()
    const userId = isAuthenticated().user._id

    useEffect(() => {
        getUserDetails(userId)
    }, [])

    const getUserDetails = async (id) => {
        const url = `${API}/user/details/${id}`
        await axios.get(url)
                    .then(user => setUser(user.data))
                    .catch(() => console.log("Error get all users"))
    }

    return (
        <div>
            <DashLayout>
                <h4 className="m-3 mb-5"> Account Details </h4>
                <div className="row">
                    <div className="col-md-8 offset-lg-2">
                        { user && (
                            <div className="user mx-5">
                                <div className="input-group mb-3">
                                    <button className="btn btn-secondary input-group-text">ID</button>
                                    <button className="btn btn-outline-secondary input-group-text">{user._id}</button>
                                    {/* <span className="input-group-text">{user._id}</span> */}
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-secondary input-group-text">Name</button>
                                    <button className="btn btn-outline-secondary input-group-text">{user.firstName} {user.lastName}</button>
                                    {/* <span className="input-group-text">{user.firstName} {user.lastName}</span> */}
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-secondary input-group-text">E-mail</button>
                                    <button className="btn btn-outline-secondary input-group-text">{user.email}</button>
                                    {/* <span className="input-group-text">{user.email}</span> */}
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-secondary input-group-text">Phone Number</button>
                                    <button className="btn btn-outline-secondary input-group-text">{user.phoneNumber}</button>
                                    {/* <span className="input-group-text">{user.phoneNumber}</span> */}
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-secondary input-group-text">Age</button>
                                    <button className="btn btn-outline-secondary input-group-text">{user.age}</button>
                                    {/* <span className="input-group-text">{user.age}</span> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DashLayout>
        </div>
    )
}

export default Dash
