import React from 'react'
import classes from './Navbar.module.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faHome} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Navbar(props) {
    return (
        <nav className={classes.navbar}>
            <FontAwesomeIcon 
                style={{cursor:'pointer',marginRight:'20px'}} 
                onClick={props.clicked} 
                icon={ faBars } />
            <Link 
                to="/" >
            <FontAwesomeIcon 
                style={{cursor:'pointer',textDecoration:'none',color:'white'}} 
                icon={ faHome } />
            </Link>
            <p className={classes.heading}>Event Management App</p>
        </nav>
    )
}

export default Navbar
