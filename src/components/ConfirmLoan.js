import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import DashLayout from './DashLayout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

const ConfirmLoan = (props) => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    const loanId = props.match.params.loanId
    const [loan, setLoan] = useState()
    const [ch, setCh] = useState(false)
    const [status, setStatus] = useState()

    useEffect(() => {
        getLoanDetails()
    }, [])

    const getLoanDetails = async () => {
        const url = `${API}/loan/details/${loanId}/${userId}`
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

    const handleChange = name => event => {
        setStatus(event.target.value)
        updateStatus(event.target.value)
    }

    const updateStatus = (status)  => {
        setCh(true)
        const url = `${API}/loan/confirm/${userId}`
        const data = {
            "loanId": loanId,
            "status": status
        }
        axios.put(url, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
            setCh(true)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <DashLayout>
                <div className="p-3">
                    {loan && (
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className="loan-conf">
                                    <h5 className="mt-3 mb-5">
                                        Confirm / Reject Loan : {loanId}
                                        <Link to='/loan' className="back-link">
                                            <button className="btn btn-outline-info">&lt; Back</button>
                                        </Link>
                                    </h5>
                                    { ch && (
                                        <p className='alert alert-success my-3'>Status Changed to: {status} </p>
                                    ) }
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text">Loan ID</button>
                                        <button className="btn btn-outline-info input-group-text">{loan._id}</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text">Created At</button>
                                        <button className="btn btn-outline-info input-group-text">{moment(loan.createdAt).format('LLLL')}</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text diff">Amount</button>
                                        <button className="btn btn-outline-info input-group-text diff">{loan.amount}</button>
                                        <button className="btn btn-info input-group-text diff">Tenure in months</button>
                                        <button className="btn btn-outline-info input-group-text diff">{loan.tenure}</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text diff">Interest Rate</button>
                                        <button className="btn btn-outline-info input-group-text diff">{loan.interest_rate}</button>
                                        <button className="btn btn-info input-group-text diff">EMI</button>
                                        <button className="btn btn-outline-info input-group-text diff">{loan.EMI}</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text">User ID</button>
                                        <button className="btn btn-outline-info input-group-text">{loan.userId}</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text">Agent ID</button>
                                        <button className="btn btn-outline-info input-group-text">{loan.agentId}</button>
                                    </div>
                                    <div className="input-group mb-3">
                                        <button className="btn btn-info input-group-text">Status</button>
                                        <select className="form-select input-group-text" onChange={handleChange('status')}>
                                            <option value="0">Select Status</option>
                                            <option value="CONFIRMED">Confirmed</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DashLayout>
        </div>
    )
}

export default ConfirmLoan