import React, { Component } from 'react'
import Axios from 'axios'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classes from './Event.module.css'
import Spinner from '../Spinner/Spinner'

export default class Event extends Component {
    state = {
        loadedEvent: null,
        loaded : false,
        isDeleted: false,
    }
    componentDidMount(){
        Axios.get("/events/"+this.props.match.params.id+".json")
            .then(res => res.data)
            .then(data => this.setState({loadedEvent:data,loaded:true}))
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }

    deletePost = () => {
        if(!window.confirm('Are You sure you want to delete this Event ?')){
            return
        }
        this.setState({loaded:false})
        Axios.delete("/events/"+this.props.match.params.id+".json")
            .then(this.setState({isDeleted:true,loaded:true}))
            .then(res => console.log(res))
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }
    changeTitle = () => {
         
    }

    render() {
        if(!this.state.loaded){
            return <Spinner />
        }
        return (
            <>
                <Link className={classes.link} to="/manage-events" >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    <p>Back to Events List</p>
                </Link>
                <>
                {this.state.isDeleted ? 'Deleted' : 
                <> 
                    <div className={classes.container}>
                    <h1 className={classes.title}>
                        {this.state.loadedEvent.title} 
                    </h1>
                    <p className={classes.desc}>
                        {this.state.loadedEvent.description}  
                    </p>
                    <p className={classes.date}>
                        Event Date: {this.state.loadedEvent.date} 
                    </p>
                    <p className={classes.members}>
                        Members: {this.state.loadedEvent.members.length}
                        </p>
                    <div className={classes.buttons}>
                        <Link to={"/edit/"+this.props.match.params.id} className={classes.edit}>Edit Event</Link>
                        <button className={classes.delete} onClick={this.deletePost}>Delete This Event</button>
                    </div>
                    </div> 
                </> }
                    
                </>
            </>
        )
    }
}
