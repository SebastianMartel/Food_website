export default function Pagination ( { searching, recipesPerPage, totalAllRecipes, totalSearchResults, paginate } ) {

    const pageNumbersAllRecipes = [];

    const pageNumbersSearchResults = [];

    for (let i = 1; i <= Math.ceil(totalAllRecipes / recipesPerPage); i++) {
        pageNumbersAllRecipes.push(i);
    }

    for (let i = 1 ; i <= Math.ceil(totalSearchResults / recipesPerPage); i++) {
        pageNumbersSearchResults.push(i);
    }

    return (
        <nav>
            <ul>
                {
                    searching === true
                    ? (
                        pageNumbersSearchResults.map((number) => {
                            return (
                                <li>
                                    <a href = '#!' onClick = {() => {paginate(number)}}>
                                        {number}
                                    </a>
                                </li>
                            )
                        })
                    )
                    : pageNumbersAllRecipes.map((number) => {
                        return (
                            <li>
                                <a href = '#!' onClick = {() => {paginate(number)}}>
                                    {number}
                                </a>
                            </li>
                        )
                    })
                }
               
            </ul>
        </nav>
    )
}