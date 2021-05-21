import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios' 

import { API } from '../Config'

const Signup = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: ""
    })
    const [error, setError] = useState(false)
    const [success, setSucess] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState()

    const { name, email, password, address } = user

    const handleChange = name => event => {
        if(name !== "confirmPassword") {
            setUser({...user, [name]: event.target.value})
        }
        else {
            if(user.password  !== event.target.value) {
                setError(true)
            } else setError(false)
        }
    }

    const signup = async () => {
        const url = `${API}/signup`
        return (
            await axios.post(
                url,  
                JSON.stringify(user), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
              }
            )
            .then(() => {
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    address: ''
                })
                setSucess(true)
                setConfirmPassword()
            })
            .catch((err) => {
                console.log(err)
            })
    )}

    const onSubmit = event => {
        event.preventDefault()
        signup()
    }

    const showSuccess = success => {
        return success && (
            <p className='alert alert-success'>Account Created. Please <Link to=''>SignIn</Link> </p>
        )
    }

    return (
        <div className="signup-box">
            <div className="signup-col">
                <h5 className="m-3">Please Enter your details to create an account</h5>
                { showSuccess(success) }
                <form className="signup-form">
                    <div className="form-floating mb-3">
                        <input type="text" onChange={handleChange("name")} className="form-control" id="floatingText" placeholder="Abcd Efg" value={name} />
                        <label htmlFor="floatingText">User Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" onChange={handleChange("email")} className="form-control" id="floatingInput" placeholder="name@example.com" value={email} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={handleChange("password")} className="form-control" id="floatingPassword" placeholder="Password" value={password} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={handleChange("confirmPassword")} className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" value={confirmPassword} />
                        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        {error && (<p className="error-msg">Confirm Password should be same as Password.</p>)}
                    </div>
                    <div className="form-floating mb-3">
                        <textarea onChange={handleChange("address")} className="form-control" id="floatingAddress" placeholder="Please Enter Address" value={address} />
                        <label htmlFor="floatingAddress">Address</label>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <button className="btn btn-secondary" type="button" onClick={(e) => onSubmit(e)}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup



        