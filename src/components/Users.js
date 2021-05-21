import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import { isAuthenticated, signout } from '../auth/Auth'
import { API } from '../Config'

const Users = () => {
    const [allUsers, setAllUsers] = useState()
    const [user, setUser] = useState()
    const [tempUser, setTempUser] = useState({
        name: "",
        email: "",
        password: "",
        address: ""
    })
    const token = isAuthenticated().token
    const data = isAuthenticated().user
    const [success, setSucess] = useState(false)
    
    const { name, email, password, address } = tempUser

    const handleChange = name => event => {
        setTempUser({...tempUser, [name]: event.target.value})
    }

    const getUsers = async () => {
        const url = `${API}/users/${data._id}`
        await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => setAllUsers(res.data))
        .catch(err => console.log(err))
    }

    const getTempUser = async (id) => {
        const url = `${API}/user/${id}/${data._id}`
        await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(res => {
            setUser(res.data)
            setTempData(res.data)
        })
        .catch(err => console.log(err))
    }

    const editUser = async (id) => {
        const url = `${API}/user/edit/${id}/${data._id}`
        await axios.put(url, JSON.stringify(tempUser), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(res => setSucess(true))
        .catch(err => console.log(err))
    }

    const deleteUser = async (id) => {
        const url = `${API}/user/delete/${id}/${data._id}`
        await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const setTempData = (data) => {
        if(data) {
            setTempUser({...tempUser, 'name':data.name, 'email':data.email, 'address':data.address})
        }
    }

    const onSubmit = id => {
        // console.log(id)
        editUser(id)
    }

    const ClickDelete = id => {
        //event.preventDefault()
        deleteUser(id)
    }

    const showSuccess = () => {
        return success && (
            <p className='alert alert-success'> {name} Details Changed.</p>
        )
    }

    useEffect(() => {
        getUsers()
    }, [allUsers, user, tempUser, data])

    const showUsers = () => {
        return allUsers && allUsers.map((val, i) => (
            <div className="user-inv" key={i}>
                <p className="name"><span className="head">Name</span>{val.name}</p>
                <p className="email"><span className="head">Email</span>{val.email}</p>
                <p className="address"><span className="head">Address</span>{val.address}</p>
                {/* <p className="created-at">{val.createdAt}</p> */}
                <div className="manage-btn">
                    <button className="btn btn-outline-primary mx-2" onClick={() => getTempUser(val._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    {showDelete(val._id)}
                </div>
            </div>
        ))
    }

    const showDelete = (id) => {
        if(id !== data._id) {
            return <Link className="btn btn-outline-danger mx-2"  to='/users' onClick={() => ClickDelete(id)}>Delete</Link>
        }
    }

    const hideSuccess = () => {
        setSucess(false)
    }

    return (
        <div className="users">
            <div className="signout-btn mb-3">
                <Link className="btn btn-secondary" onClick={() => signout()} to='/'>Sign Out</Link>
            </div>
            <div className="users-box">
                {showUsers()}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Details of Id: { user && ( user._id )}</h5>
                                <button onClick={() => hideSuccess()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-5">
                                { tempUser && ( 
                                    <form className="signup-form-edit">
                                        {showSuccess()}
                                        <div className="form-floating mb-3">
                                            <input type="text" onChange={handleChange("name")} className="form-control" id="floatingText" placeholder="Abcd Efg" value={name} />
                                            <label htmlFor="floatingText">User Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} disabled />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea onChange={handleChange("address")} className="form-control" id="floatingAddress" placeholder="Please Enter Address" value={address} />
                                            <label htmlFor="floatingAddress">Address</label>
                                        </div>
                                        <div className="d-grid gap-2 mb-3">
                                            <button className="btn btn-secondary" type="button" onClick={() => onSubmit(user._id)}>Edit Details</button>
                                        </div>
                                    </form>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
