import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){
        // step 4
        if(this.state.id === '_add'){
            return;
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId : employee.emailId
                });
            });
        }        
    }
    
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        // Formulated with the active status mapping to match backend entity extensions
        let employee = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName, 
            emailId: this.state.emailId,
           // active: true 
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center font-weight-bold text-secondary mb-4">Add System Member</h3>
        }else{
            return <h3 className="text-center font-weight-bold text-secondary mb-4">Update Profile Details</h3>
        }
    }
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 p-4 shadow-sm border-0" style={{borderRadius: '16px'}}>
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group mb-3">
                                            <label className="form-label font-weight-bold small text-muted">First Name</label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group mb-3">
                                            <label className="form-label font-weight-bold small text-muted">Last Name</label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group mb-4">
                                            <label className="form-label font-weight-bold small text-muted">Email Address</label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <button className="btn btn-primary px-4" onClick={this.saveOrUpdateEmployee}>Save Profile</button>
                                            <button className="btn btn-secondary px-4 style-cancel" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent;