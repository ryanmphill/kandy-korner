import "./NavBar.css"
import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"

export const NavBar = () => {

    const currentKandyUser = localStorage.getItem("kandy_user")
    const currentUserObject = JSON.parse(currentKandyUser)

    if (currentUserObject.staff) {
        // Return Employee Views
        return <EmployeeNav />
    } else {
        // Return Customer Views
        return <CustomerNav />
    }
}

