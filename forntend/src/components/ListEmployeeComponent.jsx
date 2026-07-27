import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            searchTerm: '',
            statusFilter: 'all'
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.searchEmployee = this.searchEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    handleSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    searchEmployee() {
        EmployeeService.getEmployeesByName(this.state.searchTerm).then((res) => {
            this.setState({ employees: res.data });
        });
    }

    toggleStatus(id) {
        EmployeeService.toggleEmployeeStatus(id).then(res => {
            this.setState({
                employees: this.state.employees.map(emp => emp.id === id ? res.data : emp)
            });
        });
    }

    render() {
        // Compute real-time metric numbers for the KPI cards
        const totalCount = this.state.employees.length;
        const activeCount = this.state.employees.filter(e => e.active).length;
        const archivedCount = totalCount - activeCount;

        const filteredEmployees = this.state.employees.filter(employee => {
            if (this.state.statusFilter === 'active') return employee.active;
            if (this.state.statusFilter === 'inactive') return !employee.active;
            return true;
        });

        return (
            <div className="container py-4">
                 <h2 className="text-center mb-4 font-weight-bold text-secondary">Workforce Dashboard</h2>
                 
                 {/* NEW FEATURE: ANALYTICS SUMMARY CARDS STRIP */}
                 <div className="row mb-4">
                     <div className="col-md-4">
                         <div className="card shadow-sm border-0 bg-primary text-white p-3">
                             <small className="text-uppercase font-weight-bold opacity-7">Total Directory</small>
                             <h2 className="font-weight-bold mt-1">{totalCount} Employees</h2>
                         </div>
                     </div>
                     <div className="col-md-4">
                         <div className="card shadow-sm border-0 bg-success text-white p-3">
                             <small className="text-uppercase font-weight-bold opacity-7">Active Staff</small>
                             <h2 className="font-weight-bold mt-1">{activeCount} Active</h2>
                         </div>
                     </div>
                     <div className="col-md-4">
                         <div className="card shadow-sm border-0 bg-dark text-white p-3">
                             <small className="text-uppercase font-weight-bold opacity-7">Archived Roster</small>
                             <h2 className="font-weight-bold mt-1">{archivedCount} Hidden</h2>
                         </div>
                     </div>
                 </div>

                 {/* CONTROLS SECTION */}
                 <div className="row g-3 mb-4 align-items-center justify-content-between">
                     <div className="col-md-6 d-flex">
                         <input 
                             type="text" 
                             className="form-control me-2 shadow-sm" 
                             placeholder="Search team members by name..." 
                             value={this.state.searchTerm} 
                             onChange={this.handleSearchChange} 
                             style={{ borderRadius: '20px' }}
                         />
                         <button className="btn btn-secondary px-4 shadow-sm" type="button" onClick={this.searchEmployee} style={{ borderRadius: '20px' }}>Search</button>
                     </div>
                     <div className="col-md-3">
                         <select 
                             className="form-select form-control shadow-sm" 
                             value={this.state.statusFilter} 
                             onChange={(e) => this.setState({ statusFilter: e.target.value })}
                             style={{ borderRadius: '20px' }}
                         >
                             <option value="all">📁 All Statuses</option>
                             <option value="active">🟢 Active Only</option>
                             <option value="inactive">⚫ Archived Only</option>
                         </select>
                     </div>
                     <div className="col-md-2 text-end">
                        <button className="btn btn-primary w-100 shadow-sm font-weight-bold" onClick={this.addEmployee} style={{ borderRadius: '20px' }}>+ New Member</button>
                     </div>
                 </div>

                 {/* MODERN DYNAMIC PROFILE CARDS GRID INSTEAD OF A BORING TABLE */}
                 <div className="row">
                     {filteredEmployees.length === 0 ? (
                         <div className="col-12 text-center my-5 text-muted">
                             <h4>No workforce records match the active filters.</h4>
                         </div>
                     ) : (
                         filteredEmployees.map(employee => (
                             <div className="col-md-4 mb-4" key={employee.id}>
                                 <div className="card h-100 shadow-sm border-0 transition-all hover-shadow" style={{ borderRadius: '15px' }}>
                                     <div className="card-body d-flex flex-column justify-content-between p-4">
                                         <div>
                                             <div className="d-flex justify-content-between align-items-start mb-3">
                                                 <div className="rounded-circle bg-light d-flex align-items-center justify-content-center text-primary font-weight-bold" style={{ width: '50px', height: '50px', fontSize: '20px' }}>
                                                     {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                                 </div>
                                                 <span className={`badge px-3 py-2 ${employee.active ? 'bg-light text-success border border-success' : 'bg-light text-secondary border border-secondary'}`} style={{ borderRadius: '12px' }}>
                                                     {employee.active ? '● Active' : '○ Archived'}
                                                 </span>
                                             </div>
                                             <h5 className="card-title font-weight-bold mb-1 text-dark">{employee.firstName} {employee.lastName}</h5>
                                             <p className="card-text text-muted small mb-4">📧 {employee.emailId}</p>
                                         </div>
                                         
                                         <div className="border-top pt-3 d-flex justify-content-between gap-2">
                                             <button onClick={() => this.editEmployee(employee.id)} className="btn btn-sm btn-outline-info flex-grow-1">Edit</button>
                                             <button 
                                                 onClick={() => this.toggleStatus(employee.id)} 
                                                 className={`btn btn-sm flex-grow-1 ${employee.active ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                             >
                                                 {employee.active ? 'Archive' : 'Activate'}
                                             </button>
                                             <button onClick={() => this.deleteEmployee(employee.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         ))
                     )}
                 </div>
            </div>
        )
    }
}

export default ListEmployeeComponent;