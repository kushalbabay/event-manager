import './App.css';
import {useState} from 'react'
import Navbar from './Components/Navbar/Navbar';
import Menubar from './Components/Menubar/Menubar';
import Home from './Components/Home/Home';
import CreateEvent from './Components/CreateEvent/CreateEvent';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import ManageEvents from './Components/ManageEvents/ManageEvents';
import ContactList from './Components/ContactList/ContactList';
import Event from './Components/Event/Event'
import TrackExpense from './Components/TrackExpense/TrackExpense';
import ExpenseManager from './Components/TrackExpense/ExpenseManager/ExpenseManager';
import EditEvent from './Components/EditEvent/EditEvent';

axios.defaults.baseURL = "https://eventmanagementapp-26625.firebaseio.com/"

function App() {
  const [isVisible, setIsVisible] = useState(false)

  const openMenuHandler = () => {
    setIsVisible(true)
  }
  const closeMenuHandler = () => {
    setIsVisible(false)
  }
  return (
  <Router >
    <div className="App">
      <Navbar clicked={openMenuHandler} />
      <Menubar open={isVisible} clicked = {closeMenuHandler} />
      
        <main onClick={closeMenuHandler}>
          <Switch >
          <Route path='/' exact render={() => <Home close={closeMenuHandler} />} />
          <Route path='/create-event' render={() => <CreateEvent close={closeMenuHandler} />} />
          <Route path='/manage-events' render={() => <ManageEvents close={closeMenuHandler} />} />
          <Route path='/contact-list' render={() => <ContactList close={closeMenuHandler} />} />
          <Route path='/track-expense' render={() => <TrackExpense close={closeMenuHandler} />} />
          <Route path='/:id' exact component={Event} />
          <Route path='/expense/:id' exact component={ExpenseManager} />
          <Route path='/edit/:id' exact component={EditEvent} />
          </Switch>
        </main>
    </div>
  </Router>
  );
}

export default App;
