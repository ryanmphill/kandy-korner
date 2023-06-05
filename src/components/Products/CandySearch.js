export const CandySearch = ({setterFunction}) => {
    return (
        <div>
            <label htmlFor="candySearchBar">What candy are you looking for?</label>
            <input id="candySearchBar"
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Search Candy" />
        </div>
    )
}