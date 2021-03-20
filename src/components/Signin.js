import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios' 

import { API } from '../Config'
import { authenticate } from '../auth/Auth'

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectTo: false
    })

    const {email, password, error, redirectTo} = values

    const signin = async () => {
        const url = `${API}/signin`
        return (
            await axios.post(
                url,  
                JSON.stringify(values), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
              }
            )
            .then((result) => {
                if(result.data) {
                    return result.data
                }
            })
            .catch(() => console.log("Error in signin"))
    )}

    const handleChange1 = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        signin()
        .then(data => {
            if(data.error) setValues({...values, error: data.error, loading: false})
            else {
                authenticate(data, () => {
                    setValues({...values, error: '', redirectTo: true})
                })
            }
            
        })
        .catch(err => console.log(err))
    }

    const showError = error => {
        return error && (
            <p className='alert alert-danger'>{error}</p>
        )
    }

    const redir = redirectTo => {
        return redirectTo && (<Redirect to='/dash' />)
    }

    return (
        <form>
            <h5 className="m-3 mb-5">Please SignIn to access your account</h5>
            {showError(error)}
            {redir(redirectTo)}
            <div className="d-grid gap-2 mb-3">
                <div className="form-floating mb-3">
                    <input onChange={handleChange1('email')} type="email" className="form-control" id="floatingInput" value={email} placeholder="e@mail.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChange1('password')} type="password" className="form-control" id="floatingPassword" placeholder="Password"  value={password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button onClick={(e) => onSubmit(e)} className="btn btn-primary mb-3">Sign In</button>
            </div>
            <div className="signup-redir">
                <p className="mb-3">Please <Link to="/signup">
                   <button className="btn btn-outline-secondary">Sign Up</button>
                </Link> if you do not have an account.</p>
            </div>
        </form>
    )
}

export default Signin
