import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"



export const ApplicationViews = () => {
    
	const currentKandyUser = localStorage.getItem("kandy_user")
    const currentUserObject = JSON.parse(currentKandyUser)

    if (currentUserObject.staff) {
        // Return Employee Views
        return <EmployeeViews />
    } else {
        // Return Customer Views
        return <CustomerViews />
    }
}

