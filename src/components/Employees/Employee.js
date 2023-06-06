import { Link } from "react-router-dom"

export const Employee = ({id, fullName, email, location}) => {

    return <section className="employee">
                        <div>
                            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
                        </div>
                        <div>Email: {email}</div>
                        <div>Location: {location}</div>
                    </section>

}