import { useEffect, useState } from "react"
import { CurrencyFormatter } from "./CurrencyFormatter"
import "./ProductList.css"


export const ProductList = () => {
    const [products, setProducts] = useState([]) // Observing initial state []
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPriced, updateTopPriced] = useState(false)

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


    return <>
        <h2>List of Kandy Korner Products</h2>

        <button onClick={ () => updateTopPriced(true) }>Top Priced</button>
        <button onClick={ () => updateTopPriced(false) }>Show All</button>

        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <h3>{product.name}</h3>
                            <div>Price: <CurrencyFormatter amount={product.pricePerUnit} /></div>
                            <div>Type: {product.productType.category}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}