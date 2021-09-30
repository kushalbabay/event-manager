import React from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import  classes from  './Menubar.module.css'
import {Link} from 'react-router-dom'

function Menubar(props) {
    return (
        <div className= {props.open ? classes.Menu + " " + classes.open : classes.Menu}>
            <div className={classes["head-line"]}>
                <p>Menu</p>
                <FontAwesomeIcon style={{cursor:'pointer'}} onClick={props.clicked} icon={faTimes} />
            </div>
            <ul className={classes.list}>
                <Link className={classes.link} to='/'>Home</Link>
                <Link className={classes.link} to='/create-event'>Create An Event</Link>
                <Link className={classes.link} to='/manage-events'>Manage Events</Link>
                <Link className={classes.link} to='/track-expense'>Track Expense</Link>
                <Link className={classes.link} to='/contact-list'>Contacts List</Link>
            </ul>
        </div>
    )
}

export default Menubar
