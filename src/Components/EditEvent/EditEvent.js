import { faArrowAltCircleLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MemberListItem from '../MemberListItem/MemberListItem'
import Spinner from '../Spinner/Spinner'
import classes from './EditEvent.module.css'

export default class CreateEvent extends Component {
    state = {
        title: "",
        description: "",
        date: "",
        newMember: {name: "", contact:''},
        members: [],
        contacts: [],
        isOpen : false,
        isLoading:true
    }
    componentDidMount(){
        Axios.get("/events/" + this.props.match.params.id +".json")
            .then(res => res.data)
            .then(data => this.setState({title:data.title,description:data.description,date:data.date,members:data.members,isLoading:false}))
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
        Axios.get("/members.json")
        .then(res => res.data)
        .then(data => {
            const contacts = Object.values(data)
            this.setState({contacts : contacts})
        })
        .catch(err => alert('Something Went Wrong. Check the Network !!!'))

    }

    addMember = () => {
        const name = this.state.newMember.name
        const contact = this.state.newMember.contact
        if(!name || !contact){
            alert('Each Member must have a Name and unique Contact No')
            return
        }
        if(isNaN(contact)||contact.length!==10){
            alert('Each Member must have a valid Contact No of 10 digits')
            return
        }
        if(this.state.members.map(member=> member.contact).includes(contact)){
            alert('Each Member must have an unique Contact No')
            return
        }
        let newMember = {
            name: name,
            contact : contact,
        }
        this.setState({members : [newMember, ...this.state.members],
                        newMember: {name: "", contact:''}})
        
    }
    titleChangeHandler = (e) => {
        this.setState({title : e.target.value})
    }

    descChangeHandler = (e) => {
        this.setState({description : e.target.value})
    }

    dateChangeHandler = (e) => {
        this.setState({date : e.target.value})
    }

    saveChanges = () => {
        this.setState({isLoading:true})
        const event = {...this.state}
        if(!event.title || !event.date || !event.members.length){
            alert('Each Event must have at least a Title, Valid Date and Members.')
            return
        }
        delete event.newMember
        delete event.contacts
        delete event.isOpen
        delete event.isLoading
        this.setState({
            title: "",
            description: "",
            date: "",
            members: [],
            isSaved: false
        })
        Axios.put("/events/" + this.props.match.params.id +".json", event)
        .then(res => console.log(res))
        .then(() => this.setState({isSaved:true,isLoading:false}))
        .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }

    removeMember = (contact) => {
        let members = this.state.members
        members = members.filter(member => member.contact !== contact)
        this.setState({members: members})
    }

    newMemberNameChange = (e) => {
        this.setState({newMember : {...this.state.newMember, name: e.target.value}})
    }

    newMemberContactChange = (e) => {
        this.setState({newMember : {...this.state.newMember, contact: e.target.value}})
    }

    selectContact = (cont) => {
        let contact = this.state.contacts.find(contact => contact.contact === cont)
        this.setState({newMember: {name: contact.name, contact: contact.contact, contribution: ""},isOpen:false })

    }
    toggleContact = () => {
        this.setState(prevstate => ({isOpen : !prevstate.isOpen}))
    }


    render() {
        let active
        if(this.state.newMember.name && this.state.newMember.contact.length===10) {
            active = true
        }
        else {
            active = false
        }
        const members = 
                this.state.members.map
                    (member => 
                        <MemberListItem 
                            key={member.contact}
                            id={member.contact}
                            removeMember={this.removeMember} 
                            name={member.name} 
                            contact={member.contact}
                            contribution = {member.contribution}
                        />)
        const contacts = this.state.contacts.map(contact => {
            return (
                <div
                    key={contact.contact}
                    onClick={() => this.selectContact(contact.contact)} 
                    className={classes.singleContact}>
                    <p>{contact.name} - </p>
                    <p>{contact.contact}</p>
                </div>
            )
        })
        if(this.state.isLoading){
            return <Spinner />
        }
        return (
            <div className={classes.container}>
                <Link className={classes.link} to={"/"+this.props.match.params.id} >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    <p>Back to the Event</p>
                </Link>
                {this.state.isSaved ? <h1>Changes Saved</h1> :
                <>
                    <div className={classes.field}>
                        <p>Title of the Event:</p>
                        <input type="text" value={this.state.title} onChange={this.titleChangeHandler}/>
                    </div>
                    <div className={classes.field}>
                        <p>Description:</p>
                        <textarea name="event-desc" id="" value={this.state.description} onChange={this.descChangeHandler} cols="20" rows="5"></textarea>
                    </div>
                    <div className={classes.field}>
                        <p>Event Date:</p>
                        <input type="date" value={this.state.date} onChange={this.dateChangeHandler} name="" id=""/>
                    </div>
                    <div className={classes.entry}>
                        <p>Members</p>
                        <div className={classes.newEntry} >
                            <div onClick={this.toggleContact} className={classes.singleContact}>
                                <p>
                                    Select Contacts 
                                </p> 
                                <p>
                                    &#x25BC;
                                </p>
                            </div>
                            <div className={this.state.isOpen ? classes.selectContact+ " " + classes.show : classes.selectContact}>
                                {contacts}
                            </div>
                            <input 
                                type="text" 
                                value={this.state.newMember.name} 
                                onChange={this.newMemberNameChange} 
                                placeholder="Name"/>
                            <input 
                                type="text" 
                                value={this.state.newMember.contact} 
                                onChange={this.newMemberContactChange} 
                                placeholder='Contact No'/>
                            <button 
                                className = {active ? classes.active : null}
                                onClick={this.addMember}><FontAwesomeIcon icon={faPlusSquare} /></button>
                        </div>
                    {members}
                    </div>
                    <button className={classes.saveButton} onClick={this.saveChanges} >Save Changes</button>
                </>
                    }
                    </div>
        )
    }
}
