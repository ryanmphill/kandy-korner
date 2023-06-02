import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Define function to make fetch call and retrieve product types
const getProductTypes = async () => {
    const response = await fetch("http://localhost:8088/productTypes")
    const productTypes = await response.json()
    return productTypes
}

/////////////////////////////////////////////////////////////////////////////
// Componenet function to render ProductForm ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
export const ProductForm = () => {
    // ADD DEFAULT PROPERTIES FOR INITIAL STATE
    // State for new product being added
    const [newProduct, updateNewProduct] = useState(
        {
            name: "",
            productTypeId: 0,
            pricePerUnit: 0
        }
    )
    // State for product types
    const [productTypes, setProductTypes] = useState([])

    // Use the useNavigation() hook so you can redirect the user to the product list
    const navigate = useNavigate()

    // Set the productTypes to the fetched array with useEffect()
    useEffect(
        () => {
            const fetchProductTypes = async () => {
                const types = await getProductTypes()
                setProductTypes(types)
            }
            fetchProductTypes() 
        },
        []
    )

    // Handle the save product event
    const handleSaveProductClick = (clickEvent) => {
        clickEvent.preventDefault()

        //Check if all fields have been filled
        const formFilled = newProduct.name.length > 0 && newProduct.productTypeId > 0 && newProduct.pricePerUnit > 0;
        if (formFilled) {
            // Create the object to be saved to the API
            const productToSendToApi = {
                name: newProduct.name,
                productTypeId: newProduct.productTypeId,
                pricePerUnit: Math.round(newProduct.pricePerUnit * 100) / 100
            }

            // POST product to API ////////////////////////////////////////////
            fetch("http://localhost:8088/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productToSendToApi)
            })
                .then(response => {
                    if (response.ok) {
                        const whatWasPosted = response.json()
                        console.log("Successful POST");
                        navigate("/products");
                        console.log("Here's the response", response)
                        console.log("Here's what was posted", whatWasPosted)
                    } else {
                        window.alert("Something went wrong");
                    }
                })
                .catch(error => {
                    console.error("An error occurred:", error);
                });
        } else {
            window.alert("Please make sure all fields have been entered")
        }
    }
    

    // return the form for product submission ////////////////////////////////
    return <>
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName_input">Product name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add a new product"
                        id = "productName_input"
                        value={newProduct.name}
                        onChange={
                            (changeEvent) => {
                                const copy = {...newProduct}
                                copy.name = changeEvent.target.value
                                updateNewProduct(copy) // Updating product with value of copy
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType_dropdown">Product type:</label>
                    <select
                        className="form-control"
                        id="productType_dropdown"
                        value={newProduct.productTypeId}
                        onChange={(changeEvent) => {
                            const copy = { ...newProduct };
                            copy.productTypeId = parseInt(changeEvent.target.value);
                            updateNewProduct(copy); // Updating product with value of copy
                        }}
                    >   {/*Add options for choosing a product type*/}
                        <option value="0">Select a product type</option>
                        {
                            productTypes.map(type => <option value={type.id} key={`productType--${type.id}`}>{type.category}</option> )
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="productPrice_input">Product price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter a price for the product"
                        id = "productPrice_input"
                        value={newProduct.pricePerUnit !== 0 ? newProduct.pricePerUnit : ""} // If value is is zero, change to empty string to display placeholder text by default instead of zero
                        step="0.01" // Set the step attribute to control decimal precision
                        onChange={
                            (changeEvent) => {
                                const copy = {...newProduct}
                                copy.pricePerUnit = changeEvent.target.value !== "" ? parseFloat(changeEvent.target.value) : 0
                                updateNewProduct(copy) // Updating product with value of copy
                                console.log(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <button 
                onClick={ (clickEvent) => {handleSaveProductClick(clickEvent)} }
                className="btn btn-primary">
                Submit product
            </button>
        </form>
    </>
}