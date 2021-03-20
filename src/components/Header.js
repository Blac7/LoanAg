import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/Auth'

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to='' className="navbar-brand">AgLoan</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='' className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/dash' className="nav-link">Dashboard</Link>
                            </li>
                            { !isAuthenticated().user && (
                                <li className="nav-item">
                                    <Link to='/signup' className="nav-link">Sign Up</Link>
                                </li>
                            )}
                            { isAuthenticated().user && (
                                <li className="nav-item">
                                    <Link onClick={() => signout()} to='' className="nav-link">SignOut</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
