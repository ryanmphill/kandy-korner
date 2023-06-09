import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { CandyContainer } from "../Products/CandyContainer"



export const CustomerViews = () => {
	return <>
	<Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Your number one krazy kandy supplier</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <CandyContainer /> } />

				
            </Route>
        </Routes>
	</>
}