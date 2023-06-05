import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { ProductList } from "../Products/ProductList"
import { ProductForm } from "../Products/ProductForm"


export const EmployeeViews = () => {
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
				<Route path="products" element={ <ProductList /> } />
                <Route path="products/addProduct" element={ <ProductForm /> } />
				
            </Route>
        </Routes>
	</>
}