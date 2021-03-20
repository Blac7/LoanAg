import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import DashLayout from './DashLayout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const Users = () => {
    const [users, setUsers] = useState()
    const [searchSel, setSearchSel] = useState()
    const [searchInp, setSearchInp] = useState()
    const [fil, setFil] = useState(false)
    // const userId = isAuthenticated().user._id
    const role  = isAuthenticated().user.role

    useEffect(() => {
        if(role === 0) {
            getAllUsers()
        }
        else if (role === 1) {
            getAllUsersCustomer()
        }
        else {
            getAllUsersAgent()
        }
    }, [role])

    const getAllUsers = async () => {
        const url = `${API}/user/allUsers`
        await axios.get(url)
                    .then(users => setUsers(users.data))
                    .catch(() => console.log("Error get all users"))
    }  
    
    const getAllUsersAgent = async () => {
        const url = `${API}/user/allAgents`
        await axios.get(url)
                    .then(users => setUsers(users.data))
                    .catch(() => console.log("Error get all users"))
    } 

    const getAllUsersCustomer = async () => {
        const url = `${API}/user/allCustomers`
        await axios.get(url)
                    .then(users => setUsers(users.data))
                    .catch(() => console.log("Error get all users"))
    } 

    const displayHeading = () => {
        if (role === 0) return "All Users"
        else if (role === 1) return "Users" 
        else return "Agents"
    }

    const displayRole = (rol) => {
        if (rol === 0) return "Admin"
        else if (rol === 1) return "Agent" 
        else return "Customer"
    }

    const roleClass = (rol) => {
        if (rol === 0) return "active-admin"
        else if (rol === 1) return "active-agent" 
        else return "active-customer"
    }

    const showUserData = () => {
        return users && users.map((user, i) => (
            <div key={i} className="user-box col-md-4">
                <ul className="list-group mb-4">
                    <li className={`list-group-item list-group-item-action active ${roleClass(user.role)}`} aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">Id: {user._id}</h6>
                            <small>{moment(user.createdAt).fromNow()}</small>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Name</h6>
                            <p className="mb-0 mt-1">{user.firstName} {user.lastName}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Role</h6>
                            <p className="mb-0 mt-1">{displayRole(user.role)}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">E-mail</h6>
                            <p className="mb-0 mt-1">{user.email}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Age</h6>
                            <p className="mb-0 mt-1">{user.age}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Phone Number</h6>
                            <p className="mb-0 mt-1">{user.phoneNumber}</p>
                        </div>
                    </li>
                </ul>
            </div>
        ))
    }

    const handleSelect = event => {
        setSearchSel(event.target.value)
    }

    const handleInput = event => {
        setSearchInp(event.target.value)
    }

    const getFilteredUsers = async () => {
      const url = `${API}/user/filtered?name=${searchSel}&value=${searchInp}`
        await axios.get(url)
                    .then(users => setUsers(users.data))
                    .catch(() => console.log("Error get all users"))
    } 

    const onSubSearch = event => {
        event.preventDefault()
        getFilteredUsers()
        setFil(true)
    }

    const onSubAll = event => {
        event.preventDefault()
        if(role === 0) {
            getAllUsers()
        }
        else if (role === 1) {
            getAllUsersCustomer()
        }
        else {
            getAllUsersAgent()
        }
        setFil(false)
    }

    return (
        <div>
           <DashLayout>
               <div className="p-3">
                   <div className="users">
                       <h4 className="mb-3 mt-3">
                           {displayHeading()}
                           { fil ? (
                            <button onClick={(e) => onSubAll(e)} className="btn btn-outline-primary mx-3">Get all Users</button>
                           ) : "" }
                            <Link to='/dash' className="back-link">
                                <button className="btn btn-outline-info">&lt; Back</button>
                            </Link>   
                        </h4>
                        <div className="search-box w-50 my-4">
                            <div className="input-group mb-3">
                                <select onChange={(e) => handleSelect(e)} className="form-select" id="inputGroupSelect02">
                                    <option value="">Select Field</option>
                                    <option value="firstName">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="_id">ID</option>
                                    <option value="email">E-mail</option>
                                    <option value="phoneNumber">Phone Number</option>
                                </select>
                                <input onChange={(e) => handleInput(e)} type="text" className="form-control" placeholder="" />
                                <button onClick={(e) => onSubSearch(e)} className="btn btn-outline-primary">Search</button>
                            </div>
                        </div>
                       <div className="row">
                            {showUserData()}
                       </div>
                   </div>
               </div>
           </DashLayout>
        </div>
    )
}

export default Users
