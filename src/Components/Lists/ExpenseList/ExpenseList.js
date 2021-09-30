import React from 'react'
import classes from './ExpenseList.module.css'
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ExpenseList extends React.Component{
    state={
        newExpense: {name:"",amount:""}
    }

    newExpenseNameChange = (e) => {
        this.setState({newExpense: {...this.state.newExpense, name:e.target.value}})
    }
    newExpenseAmountChange = (e) => {
        this.setState({newExpense: {...this.state.newExpense, amount:e.target.value}})
    }

    render(){
    let expenses = this.props.expenses
            .map(expense => (
                <div 
                    key={expense.name} 
                    className={classes.expenseItem}>
                    <p>{expense.name}</p>
                    <p>{expense.amount}</p>
                    <button onClick={() => this.props.deleteExpense(expense.name)}><FontAwesomeIcon icon={faTrash} /> </button>
                            </div>))
    return (
        <div>
            <div className={classes.expenseBox}>
                <h1>Expenses</h1>
                <div className={classes.newEntry}>
                    <p> Add New Expense</p>
                    <input 
                        type="text" 
                        value={this.state.newExpense.name} 
                        onChange={this.newExpenseNameChange} 
                        placeholder='Name'/>
                    <input 
                        type="text" 
                        value={this.state.newExpense.amount} 
                        onChange={this.newExpenseAmountChange} 
                        placeholder='Amount'/>
                    <button 
                        className={classes.addExpense}
                        onClick={() => {this.props.addNewExpense(this.state.newExpense)
                                        this.setState({newExpense: {name:"",amount:""}})}}>
                            <FontAwesomeIcon icon={faPlusSquare} /> 
                    </button>
                </div>
                {expenses}
            </div>
        </div>
    )
    }
}

export default ExpenseList
