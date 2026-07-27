import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://workforce-app-production-65c9.up.railway.app/api/v1/employees";

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    // Fetches items filtered via search parameters
    getEmployeesByName(name) {
        return axios.get(EMPLOYEE_API_BASE_URL + '?name=' + name);
    }

    // CRITICAL FIX: This matches what the archive button calls!
    toggleEmployeeStatus(employeeId) {
        return axios.patch(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/toggle-status');
    }
}

export default new EmployeeService();