import React from 'react'

import Header from './Header'
import Footer from './Footer'
import '../styles.css'

const Layout = ({children, className}) => {
    return (
        <div>
            <Header />
                <div className="layout-inner container-fluid">
                    <div className={className}>{children}</div>
                </div>
            <Footer />
        </div>
    )
}

export default Layout
