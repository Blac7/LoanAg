import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import axios from 'axios'

import DashLayout from './DashLayout'
import { API } from '../Config'
import { isAuthenticated } from '../auth/Auth'

function Loan() {
    const [loans , setLoans] = useState()
    const [showFilters, setShowFilters] = useState(false)
    const [showFilHead, setShowFilHead] = useState(false)
    const [filters, setFilters] = useState({
        status: ['NEW', 'CONFIRMED', 'REJECTED'],
        amount: 10000000,
        tenure: 120,
        EMI: 1000000
    })
    const [checked, setChecked] = useState([]);
    const userId = isAuthenticated().user._id
    const role = isAuthenticated().user.role
    const token = isAuthenticated().token

    const famount = filters.amount
    const fEMI = filters.EMI

    useEffect(() => {
        if(role === 0){
            getAllLoans()
        } else if (role === 1) {
            getAllLoansAgent()
        } else {
            getAllLoansUser()
        }
    }, [])

    const getAllLoans = async () => {
        const url = `${API}/loan/all/${userId}?filters=${JSON.stringify(filters)}`
        await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setLoans(res.data)
            // console.log(loans)
        })
        .catch(() => console.log("Error get all loans"))
    }

    const getAllLoansUser = async () => {
        const url = `${API}/loan/myloans/user/${userId}?filters=${JSON.stringify(filters)}`
        await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setLoans(res.data)
            // console.log(loans)
        })
        .catch(() => console.log("Error get all loans user"))
    }

    const getAllLoansAgent = async () => {
        const url = `${API}/loan/myloans/agents/${userId}?filters=${JSON.stringify(filters)}`
        await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setLoans(res.data)
            // console.log(res)
        })
        .catch(() => console.log("Error get all loans agent"))
    }

    const displayHeading = () => {
        if (role === 0) return "All Loans"
        else if (role === 1) return "Users Loans" 
        else return "My Loans"
    } 

    const roleClass = (stat) => {
        if (stat === 'NEW') return "active-new"
        else if (stat === 'CONFIRMED') return "active-confirmed" 
        else return "active-rejected"
    } 

    const onSubmit = event => {
        event.preventDefault()
        if(role === 0){
            getAllLoans()
        } else if (role === 1) {
            getAllLoansAgent()
        } else {
            getAllLoansUser()
        }
        setShowFilters(false)
        setShowFilHead(true)
        setChecked([])
    }

    const handleToogle = c => () => {
        // return first index or -1
        const currentcategory = checked.indexOf(c);
        const newCheckedcategory = [...checked];
        if(currentcategory === -1) {
            newCheckedcategory.push(c)
        } else {
            newCheckedcategory.splice(currentcategory, 1)
        }
        setChecked(newCheckedcategory)
        // console.log(newCheckedcategory)
        setFilters({...filters, status: newCheckedcategory})
    }

    const handleRange = name => event => {
        setFilters({...filters, [name]: event.target.value})
    }

    const displayFilters = () => {
        return showFilters && (
            <div className="filters m-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="status-filters mx-3">
                            <div className="filter-title">
                                <h6 className="mb-2">Status</h6>
                            </div>
                            <div className="form-check mb-2">
                                <input onChange={handleToogle('NEW')} value={checked.indexOf('NEW') === -1} className="form-check-input" type="checkbox" id="flexCheckDefault" /> &nbsp;
                                <label className="form-check-label" htmlFor="flexCheckDefault">New</label>
                            </div>
                            <div className="form-check mb-2">
                                <input onChange={handleToogle('CONFIRMED')} value={checked.indexOf('CONFIRMED') === -1} className="form-check-input" type="checkbox" id="flexCheckChecked" />  &nbsp;
                                <label className="form-check-label" htmlFor="flexCheckChecked">Confirmed</label>
                            </div>
                            <div className="form-check mb-2">
                                <input onChange={handleToogle('REJECTED')} value={checked.indexOf('REJECTED') === -1} className="form-check-input" type="checkbox" id="flexCheckCheck" />  &nbsp;
                                <label className="form-check-label" htmlFor="flexCheckCheck">Rejected</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="amount-filters">
                            <div className="filter-title">
                                <h6 className="mb-3">Amount Range</h6>
                                <div className="am-range mx-1">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleRange('amount')} type="number" className="form-control" id="floatingAmRange" value={famount} placeholder="Select Max Amount" />
                                        <label htmlFor="floatingAmRange">Select Max Amount</label>
                                    </div>
                                    <input onChange={handleRange('amount')} type="range" className="form-range" id="customRange1" min="1000" step='1000' max="10000000" value={famount} />
                                    <span className="left-am-reading">1,000</span>
                                    <span className="right-am-reading">10,000,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="emi-filters">
                            <div className="filter-title">
                                <h6 className="mb-3">EMI Range</h6>
                                <div className="em-range mx-1">
                                    <div className="form-floating mb-3">
                                        <input onChange={handleRange('EMI')} type="number" className="form-control" id="floatingEmRange" value={fEMI} placeholder="Select Max EMI" />
                                        <label htmlFor="floatingEmRange">Select Max EMI</label>
                                    </div>
                                    <input onChange={handleRange('EMI')} type="range" className="form-range" id="customRange2" min="1000" step='1000' max="10000000" value={fEMI} />
                                    <span className="left-em-reading">1,000</span>
                                    <span className="right-em-reading">1,000,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="tenure-filters">
                            <div className="filter-title">
                                <h6 className="mb-2">Tenure / Time Period</h6>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRange('tenure')} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="12" />
                                <label className="form-check-label" htmlFor="exampleRadios1"> &lt; 1 year </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRange('tenure')} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="24" />
                                <label className="form-check-label" htmlFor="exampleRadios2"> &lt; 2 years </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRange('tenure')} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="60" />
                                <label className="form-check-label" htmlFor="exampleRadios3"> &lt; 5 years </label>
                            </div>
                            <div className="form-check">
                                <input onChange={handleRange('tenure')} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="120" />
                                <label className="form-check-label" htmlFor="exampleRadios4"> all </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filters-submit">
                    <button onClick={(e) => onSubmit(e)} className="btn btn-primary">Apply</button>
                </div>
            </div>
        )
    }
        
    const showLoanData = () => {
        return loans && loans.map((loan, i) => (
            <div key={i} className="loan-box col-md-6">
                <ul className="list-group mb-4">
                    <li className={`list-group-item list-group-item-action active ${roleClass(loan.status)}`} aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">Id: {loan._id}</h6>
                            <small>{moment(loan.createdAt).fromNow()}</small>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Status</h6>
                            <p className="mb-0 mt-1">{loan.status}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Created At</h6>
                            <p className="mb-0 mt-1">{moment(loan.createdAt).format('LLLL')}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Amount</h6>
                            <p className="mb-0 mt-1">{loan.amount}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Tenure</h6>
                            <p className="mb-0 mt-1">{loan.tenure}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">Interest Rate</h6>
                            <p className="mb-0 mt-1">{loan.interest_rate}</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-0 mt-1">EMI</h6>
                            <p className="mb-0 mt-1">{loan.EMI}</p>
                        </div>
                    </li>
                    {(role === 0 || role === 1) && (
                        <li className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-0 mt-1">User Id</h6>
                                <p className="mb-0 mt-1">{loan.userId}</p>
                            </div>
                        </li>
                    )}
                    {(role === 0 || role === 2) && (
                        <li className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-0 mt-1">Agent Id</h6>
                                <p className="mb-0 mt-1">{loan.agentId}</p>
                            </div>
                        </li>
                    )}
                    {role !== 2 && (
                        <li className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                {role === 1 && loan.status === 'NEW' && (
                                    <Link to={`/update/loan/${loan._id}`}>
                                        <button className="btn btn-outline-info">Update</button>
                                    </Link>
                                )}
                                {role === 0 && loan.status === 'NEW' && (
                                    <Link to={`/confirm/loan/${loan._id}`}>
                                        <button className="btn btn-outline-danger">Confirm / Reject</button>
                                    </Link>
                                )}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        ))
    }

    return (
        <div>
            <DashLayout>
                <div className="p-3">
                    <h5 className="mt-3 mb-5">
                        { showFilHead ? "Filtered Results" : displayHeading()}
                        <Link to='/dash' className="back-link">
                            <button className="btn btn-outline-info">&lt; Back</button>
                        </Link>
                    </h5>
                    { showFilters ? displayFilters() : (
                        <button onClick={(e) => setShowFilters(true)} className="btn btn-warning mb-3">Filters</button>
                    )}
                    { role === 1 && (
                        <div className="create-loan mb-3">
                            <Link to={`/create/loan/${userId}`}>
                                <button className="btn btn-warning">Create Loan</button>
                            </Link>
                        </div>
                    )}
                    <div className="row">
                        { showLoanData() }
                    </div>
                </div>
            </DashLayout>
        </div>
    )
}

export default Loan
