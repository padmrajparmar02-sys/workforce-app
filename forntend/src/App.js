// deployment trigger fix
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        {/* Modern full-height dashboard wrapper layout container */}
        <div className="container-fluid min-vh-100 bg-light p-0 d-flex flex-column justify-content-between">
          
          <HeaderComponent />
          
          {/* Main content viewport block container */}
          <div className="container flex-grow-1 my-4">
            <Switch> 
              <Route path="/" exact component={ListEmployeeComponent}></Route>
              <Route path="/employees" component={ListEmployeeComponent}></Route>
              <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
              <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
            </Switch>
          </div>
          
          <FooterComponent />
          
        </div>
      </Router>
    </div>
  );
}

export default App;