import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { ProductList } from "../Products/ProductList"


export const ApplicationViews = () => {
	return <>
	<Routes>
            <Route path="/" element={
                <>
                    <h1>Kany Korner</h1>
                    <div>Your number one krazy kandy supplier</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
				
            </Route>
        </Routes>
	</>
}

