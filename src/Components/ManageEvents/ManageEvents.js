import classes from './ManageEvents.module.css'
import Axios from 'axios'
import React, { Component } from 'react'
import EventList from './EventList/EventList'
import Spinner from '../Spinner/Spinner'

export default class ManageEvents extends Component {
    state = {
        events : [],
        loading:true
    }
    componentDidMount() {
        Axios.get("/events.json")
            .then(res => res.data)
            .then(data => {
                for(let key in data ){
                    data[key].id = key
                    this.setState({events : [...this.state.events, data[key]]})
                }
                this.setState({loading:false})
                this.props.close()
            })
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }

    render() {
        let events 
        if(this.state.loading){
            events = <Spinner />
        }
        else if(this.state.events.length===0){
            events = <h1>No Events Saved</h1>
        }
        else{
            events = this.state.events
            events = events.map(event => <EventList 
                                            key={event.id} 
                                            id={event.id} 
                                            route=""
                                            title ={event.title} 
                                            date={event.date} 
                                            members={event.members.length}/>)}
        return (
            <div className={classes.container}>
                {events}
            </div>
        )
    }
}
