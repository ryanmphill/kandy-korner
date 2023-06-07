import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {

    /* 
    Here is where we will extract and capture the customerId. The 'hook' in react router DOM
    is called useParams(). Much like the 'props', the react router DOM takes any route parameters 
    in the URL and puts them in an object, which we can then 'deconstruct'.  
    */
    const {customerId} = useParams()

    // Make a state variable for the customer
    const [customer, updateCustomer] = useState()

    //Observe when customerId changes with useEffect
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((customerData) => {
                    const singleCustomerObject = customerData[0]
                    updateCustomer(singleCustomerObject)
                })
        },
        [customerId]
    )

    return <>
        <section className="customer">
            <header className="customer__header">{customer?.user?.name || "User data not found"}</header>
            <div>Loyalty Number: {customer?.loyaltyNumber}</div>
            <footer className="customer__footer">Contact {customer?.user?.name} at: {customer?.user?.email}</footer>
        </section>
    </>
}