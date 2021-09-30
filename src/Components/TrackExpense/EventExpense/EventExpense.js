import React from 'react'
import { Link } from 'react-router-dom'
import classes from './EventExpense.module.css'

function EventExpense(props) {
    return (
        <Link className={classes.link} to={"/expense/"+props.id} >
            <div className={classes.item}>
                <div className={classes.col}>
                    <p className={classes.heading}>Title</p>
                    <p>{props.title}</p>
                </div>
                <div className={classes.col}>
                    <p className={classes.heading}>Event Date</p>
                    <p>{props.date}</p>
                </div>
                <div className={classes.col}>
                    <p className={classes.heading}>Total Members</p>
                    <p>{props.members}</p>
                </div>
                <div className={classes.col}>
                    <p className={classes.heading}>Contribution</p>
                    <p>{props.contribution}</p>
                </div>
            </div>
        </Link>
    )
}

export default EventExpense
