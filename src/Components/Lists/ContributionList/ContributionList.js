import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import classes from './ContributionList.module.css'

class ContributionList extends React.Component {
    state = {
        newContribution: {name:"",contact: "", contribution:""},
        isOpen:false
    }

    newContributionAmountChange = (e) => {
        this.setState({newContribution: {...this.state.newContribution, amount:e.target.value}})
    }

    selectMember = (cont) => {
        let contact = this.props.members.find(member => member.contact === cont)
        this.setState({newContribution: {name: contact.name, contact: contact.contact},isOpen:false })

    }

    toggleMember = () => {
        this.setState(prevstate => ({isOpen : !prevstate.isOpen}))
    }
    resetMember = () => {
        this.setState({newContribution: {name:"",contact: "", contribution:""}})
    }

    render() {
        const members = this.props.members.map(member => {
            return (
                <div
                    key={member.contact}
                    onClick={() => this.selectMember(member.contact)}
                    className={classes.singleMember}>
                    <p>{member.name} - </p>
                    <p>{member.contact}</p>
                </div>
            )
        })


        let contributions = this.props.contributions
                .map(contribution =>(
                    <div key={contribution.contact} className={classes.contributionItem}>
                        <div className={classes.col}>
                        <p className={classes.heading}>Name</p>
                        <p>{contribution.name}</p>
                        </div>
                        <div className={classes.col}>
                        <p className={classes.heading}>Contact</p>
                        <p>{contribution.contact}</p>
                        </div>
                        <div className={classes.col}>
                        <p className={classes.heading}>Contribution</p>
                        <p>{contribution.amount}</p>
                        </div>
                        <div className={classes.col}>
                        <p className={classes.heading}>Balance</p>
                        <p className={contribution.amount >= this.props.average ? classes.green : classes.red}>
                            {(contribution.amount - this.props.average).toFixed(2)}</p>
                        </div>
                    </div>) )
    return (
        <div>
            <div className={classes.contributionBox}>
            <h1>Contributions</h1>
            <div className={classes.newEntry}>
                <div className={classes.headline} style={{position:"relative",display:"flex",justifyContent:"space-around",width:"80%"}}>
                <p> Add Contribution</p>
                    <div onClick={this.toggleMember} className={classes.singleMember}>
                        <p>Select Member</p> 
                        <p>&#x25BC;</p>
                    </div>
                    <div className={this.state.isOpen ? classes.selectMember+ " " + classes.show : classes.selectMember}>
                        {members}
                    </div>
                </div>
                <div className={classes.ContributionInput}>
                    {this.state.newContribution.name ? <FontAwesomeIcon className={classes.resetButton} icon={faTimes} onClick={this.resetMember} /> : null }
                    <p>{this.state.newContribution.name}</p>
                    <p>{this.state.newContribution.contact}</p>
                    <input 
                        type="text" 
                        value={this.state.newContribution.amount} 
                        onChange={this.newContributionAmountChange} 
                        placeholder='Amount'/>
                    <button 
                        className={classes.addExpense} 
                        onClick={() => {
                            this.props.addNewContribution(this.state.newContribution)
                                this.setState({newContribution: {name:"",amount:""}})
                        }}>
                            <FontAwesomeIcon icon={faPlusSquare} /> 
                    </button>
                </div>
            </div>
            {contributions}
        </div>
        </div>
    )
    }
}

export default ContributionList
