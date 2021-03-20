import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DashLayout from './DashLayout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const UpdateLoan = (props) => {
    const loanId = props.match.params.loanId
    const agentId = isAuthenticated().user._id
    const token = isAuthenticated().token
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
        getLoanDetails()
    }, [])

    const { amount, tenure, interest_rate, error, success } = loan
    // , redirectTo  

    const handleChange = name => event => {
        setLoan({...loan, error: false, success: false, [name]: event.target.value})
    }

    const getLoanDetails = async () => {
        const url = `${API}/loan/details/${loanId}/${agentId}`
        await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => setLoan(res.data))
        .catch(err => console.log(err))
    }

    const loanUpdate = async () => {
        const url = `${API}/loan/update/${loanId}/${agentId}`
        return (
            await axios.put(url, JSON.stringify(loan), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                setLoan({...loan, error: false, success: true})
            })
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
        //console.log(loan)
        loanUpdate()
    }

    const showError = error => {
        return error && (
            <p className='alert alert-danger'>{error}</p>
        )
    }

    const showSuccess = success => {
        return success && (
            <p className='alert alert-success'>Loan Updated.</p>
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
                                    Update details of the loan: {loanId}.
                                </h5>
                                { showError(error) }
                                { showSuccess(success) }
                                {loan && (
                                    <form>
                                        <div className="d-grid gap-2">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-floating mb-3">
                                                        <input type="text" className="form-control" id="floatingagentId" value={loan.agentId} placeholder="agent Id" disabled/>
                                                        <label htmlFor="floatingagentId">Agent Id</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-floating mb-3">
                                                        <input type="text" className="form-control" id="floatingagentId" value={loan.userId} placeholder="user Id" disabled/>
                                                        <label htmlFor="floatingagentId">User Id</label>
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
                                                <div className="col-md-3">
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
                                            <button onClick={(e) => onSubmit(e)} className="btn btn-secondary">Update Loan</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DashLayout>
        </div>
    )
}

export default UpdateLoan
