import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios' 

import Layout from './Layout'
import { API } from '../Config'

const Signup = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        phoneNumber: '',
        role: '',
        error: '',
        success: ''
    })
    const [valErr, setValErr ] = useState({
        firstName: 'check',
        lastName: 'check',
        email: 'check',
        password: 'check',
        age: 'check',
        phoneNumber: 'check',
        role: 'check',
    })

    const { firstName, lastName, email, password, age, phoneNumber, error, success } = user

    const signup = async () => {
        const url = `${API}/signup`
        // firstName, lastName, email, password, age, phoneNumber, 
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
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    age: '',
                    phoneNumber: '',
                    role: '',
                    error: '',
                    success: true
                })
            })
            .catch((err) => {
                console.log(err)
            })
    )}

    const handleChange = name => event => { 
        validateInp(name, event.target.value)
        setUser({...user, error: false, success: false, [name]: event.target.value})
    }

    const validateInp = (name, value) => {
        if(name === 'firstName'){
            if(!(!/[^a-zA-Z]/.test(value))){
                const msg = "First Name should contain only Alphabets."
                setValErr({...valErr, firstName: msg})
            } else {
                setValErr({...valErr, firstName: ''})
            }
        }
        if(name === 'lastName'){
            if(!(!/[^a-zA-Z]/.test(value))){
                const msg = "Last Name should contain only Alphabets."
                setValErr({...valErr, lastName: msg})
            } else {
                setValErr({...valErr, lastName: ''})
            }
        }
        if(name === 'email'){
            if(!(/.+@.+\.[A-Za-z]+$/.test(value))) {
                const msg = "Email is to be in correct format. Ex aa@bb.cc"
                setValErr({...valErr, email: msg})
            } else {
                setValErr({...valErr, email: ''})
            }
        }
        if(name === 'password'){
            const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(!mediumRegex.test(value)){
                const msg = "Password must be min 6 chars, 1 upper case, 1 special char"
                setValErr({...valErr, password: msg})
            } else {
                setValErr({...valErr, password: ''})
            }
        }
        if(name === 'age'){
            if(value <= 0 || value > 120){
                const msg = "Age Should be between > 0 and < 120."
                setValErr({...valErr, age: msg})
            } else if (value > 0 && value < 18) {
                const msg = "Min age 18 to Register."
                setValErr({...valErr, age: msg})
            } else {
                setValErr({...valErr, age: ''})
            }
        }
        if(name === 'role'){
            if(value) setValErr({...valErr, role: ''})
        }
        if(name === 'phoneNumber'){
            if(!(!/[^0-9]/.test(value)) || value.length !== 10){
                const msg = "Phone Number should contain 10 digits."
                setValErr({...valErr, phoneNumber: msg})
            } else {
                setValErr({...valErr, phoneNumber: ''})
            }
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        if(!valErr.firstName && !valErr.lastName && !valErr.email && !valErr.password
            && !valErr.age && !valErr.role && !valErr.phoneNumber
            && firstName.length > 0 && lastName.length > 0) {
           signup()
        } else {
            setUser({...user, error: "Please Fill all fields"})
        }
    }

    const showError = error => {
        return error && (
            <p className='alert alert-danger'>{error}</p>
        )
    }

    const showSuccess = success => {
        return success && (
            <p className='alert alert-success'>Account Created. Please <Link to=''>SignIn</Link> </p>
        )
    }

    return (
        <div>
            <Layout>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="signup-col p-3">
                                <h5 className="m-3">Please Enter your details to create an account</h5>
                                { showError(error) }
                                { showSuccess(success) }
                                <form>
                                    <div className="d-grid gap-2 pt-4 p-5">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('firstName')} type="text" className="form-control" id="floatingFirstName" value={firstName} placeholder="First Name" maxLength="50" />
                                                    <label htmlFor="floatingFirstName">First Name</label>
                                                </div>
                                                {valErr.firstName && valErr.firstName !== 'check' && (
                                                    <small className="val-error-msg mb-3">{valErr.firstName}</small>
                                                )}
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('lastName')} type="text" className="form-control" id="floatingLastName" value={lastName} placeholder="last Name" maxLength="50" />
                                                    <label htmlFor="floatingLastName">Last Name</label>
                                                </div>
                                                {valErr.lastName && valErr.lastName !== 'check' &&(
                                                    <small className="val-error-msg mb-3">{valErr.lastName}</small>
                                                )}
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('email')} type="email" className="form-control" id="floatingInput1" value={email} placeholder="e@mail.com"  maxLength="100" />
                                                    <label htmlFor="floatingInput1">Email address</label>
                                                </div>
                                                {valErr.email && valErr.email !== 'check' && (
                                                    <small className="val-error-msg mb-3">{valErr.email}</small>
                                                )}
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('password')} type="password" className="form-control" id="floatingPassword1" value={password} placeholder="Password"  maxLength="25" />
                                                    <label htmlFor="floatingPassword1">Password</label>
                                                </div>
                                                {valErr.password && valErr.password !== 'check' && (
                                                    <small className="val-error-msg mb-3">{valErr.password}</small>
                                                )}
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('age')} type="number" className="form-control" id="floatingAge" value={age} placeholder="0" required min="0" max="120" />
                                                    <label htmlFor="floatingAge">Age</label>
                                                </div>
                                                {valErr.age && valErr.age !== 'check' && (
                                                    <small className="val-error-msg mb-3">{valErr.age}</small>
                                                )}
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-floating mb-3">
                                                    <div className="form-check form-check-inline">
                                                        <input onChange={handleChange('role')} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="2" /> &nbsp;
                                                        <label className="form-check-label" htmlFor="inlineRadio1">Customer</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input onChange={handleChange('role')} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" /> &nbsp;
                                                        <label className="form-check-label" htmlFor="inlineRadio2">Agent</label>
                                                    </div>
                                                </div>
                                                {valErr.role && valErr.role !== 'check' && (
                                                    <small className="val-error-msg mb-3">{valErr.role}</small>
                                                )}
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('phoneNumber')} type="text" className="form-control" id="floatingPhoneNumber" value={phoneNumber} placeholder="9999999999" maxLength="10" />
                                                    <label htmlFor="floatingPhoneNumber">Phone Number</label>
                                                </div>
                                                {valErr.phoneNumber && valErr.phoneNumber !== 'check' && (
                                                    <small className="val-error-msg mb-3">{valErr.phoneNumber}</small>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={(e) => onSubmit(e)} className="btn btn-secondary">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Signup



        