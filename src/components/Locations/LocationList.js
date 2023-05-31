import { useEffect, useState } from "react"
import "./LocationList.css"

export const LocationList = () => {

    const [locations, setLocations] = useState([]) // Observing initial state []

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
        <h2>List of Kandy Korner Locations</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location--${location.id}`}>
                            <h3>{location.address}</h3>
                            <div>Square Footage: {location.squareFootage}</div>
                        </section>
                    }
                )
            }

        </article>
    </>
}