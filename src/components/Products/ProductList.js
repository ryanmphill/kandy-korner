import { useEffect, useState } from "react"
import { CurrencyFormatter } from "./CurrencyFormatter"
import "./ProductList.css"
import { useNavigate } from "react-router-dom"


export const ProductList = ({ searchTermState, updateSearchTermState }) => {
    const [products, setProducts] = useState([]) // Observing initial state []
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPriced, updateTopPriced] = useState(false)
    const navigate = useNavigate()

    // Get the current user so that the proper interface can be displayed for customers vs staff
    const currentKandyUser = localStorage.getItem("kandy_user")
    const currentUserObject = JSON.parse(currentKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (topPriced) {
                const priceyProducts = products.filter(product => product.pricePerUnit > 2.00)
                setFilteredProducts(priceyProducts)
            } else {
                setFilteredProducts(products)
            }
        },
        [topPriced, products]
    )

    // Observe the searchTermState from the parent container
    useEffect(
        () => {
            if (searchTermState !== "displayAll") {
                const searchedCandies = products.filter(product => {
                    return product.name.toLowerCase().includes(searchTermState.toLowerCase())
                })
                setFilteredProducts(searchedCandies)
            } else {
                setFilteredProducts(products)
            }
            
        },
        [ searchTermState ]
    )


    return <>
        <h2>Kandy Korner Products</h2>

        <button onClick={ () => updateTopPriced(true) }>Top Priced</button>
        <button onClick={() => {
                            updateTopPriced(false) // undo Top priced filter
                            currentUserObject.staff === false && updateSearchTermState("displayAll") // When searchTermState is "displayAll", the useEffect will update filteredProducts with all products
                        }}>Show All</button>

        {   // Use the '&&' operator if you want to make an 'if' statement and don't need an 'else'
            // Otherwise, you can use {condition} ? {what happens if true} : {what happens otherwise} 
            currentUserObject.staff && <button onClick={ () => navigate("/products/addProduct") }>Add a Product</button>
        }

        <article className="products">
            {
                currentUserObject.staff || searchTermState !== ""
                // For a customer, if the search bar is empty, don't show any candies
                ? filteredProducts.map(
                     (product) => {
                         return <section className="product" key={`product--${product.id}`}>
                             <h3>{product.name}</h3>
                             <div>Price: <CurrencyFormatter amount={product.pricePerUnit} /></div>
                             {  // Only show the 'type' for Employees
                                 currentUserObject.staff && <div>Type: {product.productType.category}</div>
                             }
                         </section>
                     }
                 )
                : <div>Search for a candy</div>
            }
        </article>
    </>
}