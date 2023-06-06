import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return <article className="employees">
        {
            // NOTE: The 'key' has to be in the component that is creating the list of items to display
            employees.map(employee => <Employee key={`employee--${employee.userId}`} 
                                id={employee.userId} 
                                fullName={employee.user.name} 
                                email={employee.user.email}
                                location={employee.location.address} />)
        }
    </article>
}