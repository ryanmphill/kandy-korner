import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Define function to make fetch call and retrieve employee types
const getLocations = async () => {
    const response = await fetch("http://localhost:8088/locations")
    const locationList = await response.json()
    return locationList
}

/////////////////////////////////////////////////////////////////////////////
// Component function to render AddEmployee ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
export const AddEmployee = () => {
    // ADD DEFAULT PROPERTIES FOR INITIAL STATE

    // State for new user being added
    const [newUser, updateNewUser] = useState(
        {
            name: "",
            email: "",
            isStaff: true
            }
    )

    // State for new employee being added
    const [newEmployee, updateNewEmployee] = useState(
        {
            startDate: "",
            payRate: 0,
            locationId: 0,
            userId: 0
        }
    )
    // State for locations
    const [locationList, setLocationList] = useState([])

    // Use the useNavigation() hook so you can redirect the user to the employee list
    const navigate = useNavigate()

    // Set the locationList to the fetched array with useEffect()
    useEffect(
        () => {
            const fetchLocations = async () => {
                const locations = await getLocations()
                setLocationList(locations)
            }
            fetchLocations() 
        },
        []
    )

    // Handle the save employee event
    const handleSaveEmployeeClick = (clickEvent) => {
        clickEvent.preventDefault()

        //Check if all fields have been filled
        const formFilled = newUser.name.length > 0 && newEmployee.locationId > 0 && newEmployee.payRate > 0 && newEmployee.startDate.length > 0;
        if (formFilled) {
            // Create the user object to be saved to the API
            const userToSendToApi = {...newUser}

            // POST employee to API ////////////////////////////////////////////
            fetch("http://localhost:8088/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToSendToApi)
            })
                .then(response => {
                    if (response.ok) {
                        
                        return response.json(); // Await the response.json() Promise
                        //////////////////////////////////////////////////////
                    } else {
                        throw new Error("Unable to create new user");
                    }
                })
                .then(postedUserObject => {
                    const copy = { ...newEmployee };
                    console.log("New user successfully created", postedUserObject);
                    // Add new user id foreign key to employee object ///////
                    copy.userId = postedUserObject.id;
                    updateNewEmployee(copy);
                    //////////////////////////////////////////////////////////////////////
                    /* Once newEmployee.userId state has changed, useEffect() will trigger a 
                       POST for newly updated employee object to be sent to the API 
                       with a foreign key userId that matched the newly posted user object
                    *//////////////////////////////////////////////////////////////////////
                })
                .catch(error => {
                    console.error("An error occurred:", error);
                    window.alert("Something went wrong");
                });
        } else {
            window.alert("Please make sure all fields have been entered")
        } 
    }

    useEffect(
        () => {
            // When userId is updated and is not equal to zero, POST the newEmployee
            if (newEmployee.userId !== 0) {
                // Create shallow copy of new employee object
                const employeeToPost = {...newEmployee}
                // POST new employee to API
                fetch("http://localhost:8088/employees", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToPost)
                })
                    .then(secondResponse => {
                        if (secondResponse.ok) {
                            return secondResponse.json();
                        } else {
                            throw new Error("Error with creating employee");
                        }
                    })
                    .then(postedEmployee => {
                        console.log("New Employee successfully created", postedEmployee);
                        navigate("/employees");
                        // Reset newEmployee.userId to zero
                        updateNewEmployee((prevEmployee) => ({ ...prevEmployee, userId: 0 }))
                    })
                    .catch(error => {
                        console.error("An error occurred:", error);
                        window.alert("Something went wrong");
                    });
            }
        },
        [newEmployee, navigate]
    )
    

    // return the form for employee submission ////////////////////////////////
    return <>
        <form className="addEmployeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName_input">Employee name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add a new employee"
                        id = "employeeName_input"
                        value={newEmployee.name}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newUser}
                                copy.name = changeEvent.target.value
                                copy.email = changeEvent.target.value.toLowerCase().replace(/\s/g, "") + "@example.com"
                                updateNewUser(copy) // Updating employee with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location_dropdown">Location of Employment:</label>
                    <select
                        className="form-control"
                        id="location_dropdown"
                        value={newEmployee.locationId}
                        onChange={(changeEvent) => {
                            const copy = { ...newEmployee };
                            copy.locationId = parseInt(changeEvent.target.value);
                            updateNewEmployee(copy); // Updating employee with value of copy
                        }}
                    >   {/*Add options for choosing a employee type*/}
                        <option value="0">Select a location</option>
                        {
                            locationList.map(location => <option value={location.id} key={`location--${location.id}`}>{location.address}</option> )
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeDate_input">Employee Start Date:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="MM/DD/YYYY"
                        id = "employeeDate_input"
                        value={newEmployee.startDate}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newEmployee}
                                copy.startDate = changeEvent.target.value
                                updateNewEmployee(copy) // Updating employee with value of copy
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeRate_input">Employee rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter rate of pay for the employee"
                        id = "employeeRate_input"
                        value={newEmployee.payRate !== 0 ? newEmployee.payRate : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                        step="0.01" // Set the step attribute to control decimal precision
                        onChange={
                            (changeEvent) => {
                                const copy = {...newEmployee}
                                copy.payRate = changeEvent.target.value !== "" ? Math.round(parseFloat(changeEvent.target.value) * 100) / 100 : 0
                                updateNewEmployee(copy) // Updating employee with value of copy
                            }
                        } />
                </div>
            </fieldset>
            
            <button 
                onClick={ (clickEvent) => {handleSaveEmployeeClick(clickEvent)} }
                className="btn btn-primary">
                Submit New Employee
            </button>
        </form>
    </>
}