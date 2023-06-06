import { useEffect, useState } from "react"





export const ShowMeWhere = ({productInStoreArray}) => {

    const [locations, setLocations] = useState([])
    const [locationsWithThisProduct, setLocationsWithThisProduct] = useState([])

    // Define function to make fetch call and retrieve locations
    const getLocationsArray = async () => {
        const response = await fetch("http://localhost:8088/locations")
        const locations = await response.json()
        setLocations(locations)
    }

    useEffect(
        () => {
            getLocationsArray()
        },
        []
    )

    useEffect(
        () => {
            const matchingLocations = locations.filter(
                /*
                    Iterate through the locations array and the productInStoreArray to retrieve the
                    locations where each product can be found. Use the .filter method on the locations array and then use
                    the .some() method on the productInStoreArray as the callback. Inside of the .some() method,
                    check if any items in productInStoreArray has a foreign key that matches current
                    location id. If it matches, it returns true and the location will be included in the 
                    new array.
                */
                (location) => {
                    return productInStoreArray.some(productInStore => productInStore.locationId === location.id)
                })
                setLocationsWithThisProduct(matchingLocations)
        },
        [locations, productInStoreArray]
    )
    return <div className="showMeWhere" onClick={() => {
                            let locationList = "This product is available at the following locations:\n"
                            locationsWithThisProduct.length >= 1 
                                ? locationList += locationsWithThisProduct.map(place => `-- ${place.address}`).join("\n")
                                : locationList = "Product not currently available at any locations"
                            window.alert(locationList)
                            
                            }
                        }
        >Show Me Where</div>
}