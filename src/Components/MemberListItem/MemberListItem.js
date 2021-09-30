import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import classes from './MemberListItem.module.css'


function MemberListItem(props) {
    return (
        <div className={classes.memberList} >
            <div className="Col">
                <p className={classes.heading}>Name</p>
                <p>{props.name}</p>
            </div>
            <div className="Col">
                <p className={classes.heading}>Contact</p>
                <p>{props.contact}</p>
            </div>
            {props.contribution >=0  ? <div className="Col">
                <p className={classes.heading}>Contribution</p>
                <p>{props.contribution}</p>
            </div> : null}
        <button onClick={() => props.removeMember(props.id) }><FontAwesomeIcon icon={faUserMinus} /></button>
    </div>
    )
}

export default MemberListItem
