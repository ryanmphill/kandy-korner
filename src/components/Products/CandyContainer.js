import { useState } from "react"
import { CandySearch } from "./CandySearch"
import { ProductList } from "./ProductList"


export const CandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <CandySearch setterFunction={setSearchTerms} />
        <ProductList searchTermState={searchTerms} updateSearchTermState={setSearchTerms} />
    </>
}