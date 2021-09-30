import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ContributionList from '../../Lists/ContributionList/ContributionList'
import ExpenseList from '../../Lists/ExpenseList/ExpenseList'
import Spinner from '../../Spinner/Spinner'
import classes from './ExpenseManager.module.css'

export default class ExpenseManager extends Component {
    
    state={
        loadedEvent:null,
        loading:true,
        members:null,
        contributions:[],
        expenses: [],
    }

    componentDidMount() {
        
        Axios.get("/events/"+this.props.match.params.id+".json")
            .then(res => res.data)
            .then(data => this.setState({loadedEvent:data,loading:false}))
            .then(() => this.setState({members:this.state.loadedEvent.members}))
            .then(() => {
                if(this.state.loadedEvent.finances){
                    if(this.state.loadedEvent.finances.contributions){
                        this.setState({contributions:[...this.state.loadedEvent.finances.contributions]})
                    }
                    if(this.state.loadedEvent.finances.expenses){
                        this.setState({expenses:[...this.state.loadedEvent.finances.expenses]})
                    }
                }
                else{
                    for (let member of this.state.members){
                        this.setState({contributions: [...this.state.contributions, {...member, amount: 0}]})
                    }
                }
            })
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }
    addNewExpense = (newExpenses) => {
        const newExpense = newExpenses
        if(!newExpense.name || !newExpense.amount){
            alert('Each Expense must have a name and valid Amount')
            return
        }
        if(isNaN(newExpense.amount)){
            alert('Amount must be a number')
            return 
        }
        newExpense.amount = parseInt(newExpense.amount)
        let index = this.state.expenses.map(expense=> expense.name).indexOf(newExpense.name)
        if(index===-1){
            this.setState({expenses: [newExpense, ...this.state.expenses],newExpense: {name:"",amount:""}})
        }
        else{
            let expenses = [...this.state.expenses]
            expenses[index].amount += newExpense.amount
            this.setState({expenses,newExpense: {name:"",amount:""}})
        }

    }
    deleteExpense = (name) => {
        const expenses = this.state.expenses.filter(expense => expense.name !== name)
        this.setState({expenses})
    }

    addNewContribution = (newContributions) => {
        const newContribution = newContributions
        if(!newContribution.name || !newContribution.amount){
            alert('Each Expense must have a name and valid Amount')
            return
        }
        if(isNaN(newContribution.amount)){
            alert('Amount must be a number')
            return 
        }
        newContribution.amount = parseInt(newContribution.amount)
        if(!newContribution.amount){
            newContribution.amount=0
        }
        let index = this.state.contributions.map(contribution=> contribution.name).indexOf(newContribution.name)
        if(index===-1){
            this.setState({contributions: [newContribution, ...this.state.contributions]})
        }
        else{
            let contributions = [...this.state.contributions]
            contributions[index].amount += newContribution.amount
            this.setState({contributions})
        }
    }

    saveExpense = () => {
        const finances = {
            expenses: this.state.expenses,
            contributions: this.state.contributions,
        }

        Axios.put("/events/"+this.props.match.params.id+"/finances.json", finances)
            .then(res => console.log(res))
            .then(() => {
                alert("Changes Succesfully Saved")
            })
            .catch(err => alert('Something Went Wrong. Check the Network !!!'))
    }

    render() {
        let total = this.state.expenses.map(expense => expense.amount).reduce((total, el) => total+el,0)
        if(this.state.loading){
            return <Spinner />
        }

        let average = (total / this.state.loadedEvent.members.length)
        
        return (
            <div>
                <h1 className={classes.title} style={{color: 'rgb(41, 35, 88)',textTransform:"capitalize",fontFamily:'Josefin Slab',marginTop:'20px',fontSize:'48px'}}>{this.state.loadedEvent.title}</h1>
                <Link className={classes.link} to="/track-expense" >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    <p>Back to Events List</p>
                </Link>
                <div className={classes.container}>
                    <div className={classes.expenseList}>
                        <ExpenseList 
                            addNewExpense={this.addNewExpense}
                            deleteExpense={this.deleteExpense}
                            expenses={this.state.expenses} /> 
                    </div>
                
                    <div className={classes.ContributionList}>
                        <ContributionList 
                            members={this.state.loadedEvent.members}
                            addNewContribution = {this.addNewContribution}
                            contributions={this.state.contributions}
                            average={average} />
                    </div>
                </div>
                <button className={classes.saveExpense} onClick={this.saveExpense}>Save Expenses</button>
            </div>
        )
    }
}
