import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark shadow-sm" style={{ backgroundColor: '#0f172a', padding: '16px 32px', borderBottom: '1px solid #1e293b' }}>
                        <div>
                            <a href="/employees" className="navbar-brand font-weight-bold d-flex align-items-center" style={{ letterSpacing: '0.5px', fontSize: '20px', color: '#f8fafc' }}>
                                <span style={{ marginRight: '8px' }}>💼</span> Enterprise Directory Studio
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent;