import React, { useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import classes from './Home.module.css'

function Home() {
    return (
        <>
            <h2 className={classes.heading}>Welcome to the Event Management App</h2>
            <p>Here You can - </p>
            <ul className={classes.list}>
                <li>A. Create New Events.</li>
                <li>B. Manage Existing Events.</li>
                <li>C. Track Event Expenses.</li>
                <li>D. Manage Members List.</li>
            </ul>
            <p>click on the  {<FontAwesomeIcon icon={faBars}/>}  button to begin ! </p>
        </>
    )
}

export default Home
