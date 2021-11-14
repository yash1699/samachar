import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

    const clearSearchBox = ()=>{
        document.getElementById('searchBox').value = ''
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ color: '#03d7fc', fontSize: '22px' }}>Samachar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/" style={{ color: '#03fc88' }} onClick={clearSearchBox}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/business" style={{ color: '#fca903' }} onClick={clearSearchBox}>Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment" style={{ color: '#f403fc' }} onClick={clearSearchBox}>Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/health" style={{ color: '#fc0352' }} onClick={clearSearchBox}>Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science" style={{ color: '#03fcd3' }} onClick={clearSearchBox}>Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports" style={{ color: '#9dfc03' }} onClick={clearSearchBox}>Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/technology" style={{ color: '#f0fc03' }} onClick={clearSearchBox}>Technology</Link>
                            </li>
                            <form className="d-flex my-2 mx-2" style={{ position: 'absolute', right: 0, margin: '0px 20px' }}>
                                <input id='searchBox' className="form-control me-2" type="search" placeholder="Search articles" aria-label="Search"/>
                                <Link className="btn btn-outline-warning" type="submit" to="/search" onClick={()=>{props.setKeyword(document.getElementById('searchBox').value)}}>Search</Link>
                            </form>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
