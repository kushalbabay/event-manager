import React, { Component } from 'react'
import MemberListItem from '../MemberListItem/MemberListItem'
import classes from './ContactList.module.css'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import Spinner from '../Spinner/Spinner'

export default class ContactList extends Component {
    state= {
        contacts : [],
        newContact : {name:"",contact:''},
        loading: true,
        newMemberAdded: false
    }
    componentDidMount(){
        Axios.get('/members.json')
            .then(res=> res.data)
            .then(data => {
                for(let key in data ){
                    data[key].id = key
                    this.setState({contacts : [...this.state.contacts, data[key]]})
                }
                this.setState({loading: false})
                this.props.close()
            })
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }

    removeContact = (id) => {
        if(!window.confirm('Are You sure you want to delete this Person ?')){
            return
        }
        let contacts = this.state.contacts.filter(member => member.id !== id)
        this.setState({contacts: contacts})
        Axios.delete("/members/"+id+".json")
            .then(res => console.log(res))
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }

    addContact = () => {
        const name = this.state.newContact.name
        const contact = this.state.newContact.contact
        if(!name || !contact){
            alert('Each Member must have a Name and unique Contact No')
            return
        }
        if(isNaN(contact)||contact.length!==10){
            alert('Each Member must have a valid Contact No of 10 digits')
            return
        }
        if(this.state.contacts.map(contact=> contact.contact).includes(contact)){
            alert("There's already a contact with the same Contact No.")
            return
        }
        let newMember = {
            name: name,
            contact : contact,
            
        }
        Axios.post("/members.json", newMember)
            .then(req => console.log(req))
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
        this.setState({contacts: [...this.state.contacts,newMember] ,newContact: {name: "", contact:'' }})
    }

    newContactNameChange = (e) => {
        this.setState({newContact : {...this.state.newContact, name: e.target.value}})
    }

    newContactContactChange = (e) => {
        this.setState({newContact : {...this.state.newContact, contact: e.target.value}})
    }

    

    render() {
        let contacts=this.state.contacts.reverse().map(contact => {
            return <MemberListItem 
                        key={contact.id} 
                        removeMember={this.removeContact} 
                        name={contact.name} 
                        contact={contact.contact}
                        id={contact.id}
                            />
                    })
                    let active
            if(this.state.newContact.name && this.state.newContact.contact.length===10) {
                active = true
            }
            else {
                active = false
            }
        return (
            <div className={classes.main}>
                <div className={classes.newMember}>
                    <h2>Add New Contacts: </h2>
                    <input 
                            type="text" 
                            value={this.state.newContact.name} 
                            onChange={this.newContactNameChange} 
                            placeholder="Name"/>
                        <input 
                            type="text" 
                            value={this.state.newContact.contact} 
                            onChange={this.newContactContactChange} 
                            placeholder='Contact No'/>
                        <button 
                            className={active ? classes.active : null}
                            onClick={this.addContact}><FontAwesomeIcon icon={faPlusSquare} /></button>

                </div>
                <div className={classes.contacts}>
                    <p>Contacts</p>
                    <h1>{this.state.loading ? <Spinner /> : contacts.length ? null : 'No Contacts Saved' }</h1>
                    {contacts}
                </div>
            </div>
        )
    }
}
