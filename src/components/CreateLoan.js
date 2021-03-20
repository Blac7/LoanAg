import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DashLayout from './DashLayout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const CreateLoan = (props) => {
    const agentId = props.match.params.userId
    const token = isAuthenticated().token
    const [users, setUsers] = useState()
    const [loan , setLoan] = useState({
        amount: '0',
        tenure: '0',
        interest_rate: '0.0',
        EMI : '0',
        userId: '',
        agentId: agentId,
        status: 'NEW',
        error: '',
        success: '',
        redirectTo: ''
    })

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const url = `${API}/user/allCustomers`
        await axios.get(url)
                    .then(users => setUsers(users.data))
                    .catch(() => console.log("Error get all users"))
    } 

    const { amount, tenure, interest_rate, EMI, userId, error, success } = loan
    // , redirectTo  

    const handleChange = name => event => {
        setLoan({...loan, error: false, success: false, [name]: event.target.value})
    }

    const loanCreate = async () => {
        const url = `${API}/loan/create/${agentId}`
        return (
            await axios.post(url, JSON.stringify(loan), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => setLoan({
                            amount: '0',
                            tenure: '0',
                            interest_rate: '0.0',
                            EMI : '0',
                            userId: '',
                            agentId: agentId,
                            status: 'NEW',
                            error: '',
                            success: true,
                            redirectTo: ''
                        })
            )
            .catch(err => console.log("Loan Error: ", err))
        )
    }

    const calcEMI = event => {
        event.preventDefault()
        const p = parseFloat(loan.amount)
        const r = parseFloat(loan.interest_rate)
        const n = parseFloat(loan.tenure)
        let emi = (p * r * ((1 + r) ** n)) / (((1 + r) ** n) - 1)
        emi = emi.toFixed(2)
        setLoan({...loan, error: false, success: false, EMI: emi})
    }

    const onSubmit = event => {
        event.preventDefault()
        // console.log(loan)
        loanCreate()
    }

    const showError = error => {
        return error && (
            <p className='alert alert-danger'>{error}</p>
        )
    }

    const showSuccess = success => {
        return success && (
            <p className='alert alert-success'>Loan Created.</p>
        )
    }

    return (
        <div>
            <DashLayout>
                <div className="p-3">
                    <Link to='/loan' className="back-link">
                        <button className="btn btn-outline-info">&lt; Back</button>
                    </Link>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="signup-col p-5">
                                <h5 className="my-4">
                                    Please Enter your details to create loan.
                                </h5>
                                { showError(error) }
                                { showSuccess(success) }
                                <form>
                                    <div className="d-grid gap-2">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('agentId')} type="text" className="form-control" id="floatingagentId" value={agentId} placeholder="agentId"/>
                                                    <label htmlFor="floatingagentId">Agent Id</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <select onChange={handleChange('userId')} className="form-select" id="floatinguserId" value={userId} >
                                                        <option value='0'>...</option>
                                                        {users && users.map((user, i) => (
                                                            <option key={i} value={user._id}>{user.firstName} {user.lastName}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="floatinguserId">Select User</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('amount')} type="number" className="form-control" id="floatingamount" value={amount} placeholder="amount" min="0" />
                                                    <label htmlFor="floatingamount">Amount</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('tenure')} type="number" className="form-control" id="floatingtenure" value={tenure} placeholder="tenure" min="0" />
                                                    <label htmlFor="floatingtenure">Tenure (in months)</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input onChange={handleChange('interest_rate')} type="number" className="form-control" id="floatinginterest_rate" value={interest_rate} placeholder="interest_rate" min="0" />
                                                    <label htmlFor="floatinginterest_rate">Interest Rate</label>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                    <div className="form-floating mb-3">
                                                        <button onClick={(e) => calcEMI(e)} className="btn btn-primary">Calculate EMI</button>
                                                    </div>
                                                </div>
                                            {loan.EMI > 0 && (
                                                <div className="col-md-3">
                                                    <div className="form-floating mb-3">
                                                        <input type="number" className="form-control" id="floatingEMI" value={loan.EMI} placeholder="EMI" min="0" disabled />
                                                        <label htmlFor="floatingEMI">EMI</label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={(e) => onSubmit(e)} className="btn btn-secondary">Create Loan</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DashLayout>
        </div>
    )
}

export default CreateLoan
