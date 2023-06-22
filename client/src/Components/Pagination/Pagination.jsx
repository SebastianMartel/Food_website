import './Pagination.css'


//__________________________________________________
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
        <div>
            <div className = 'navPage'>
                {
                    searching === true
                    ? (
                        pageNumbersSearchResults.map((number, index) => {
                            return (
                                <a  key = {index} className = 'pageBox' href = '#!' onClick = {() => {paginate(number)}}>
                                    <div className = 'pageNumber'>
                                            {number}
                                    </div>
                                </a>
                            )
                        })
                    )
                    : pageNumbersAllRecipes.map((number, index) => {
                        return (
                                <a key = {index} className = 'pageBox' href = '#!' onClick = {() => {paginate(number)}}>
                                    <div className = 'pageNumber'>
                                            {number}
                                    </div>
                                </a>
                        )
                    })
                }
            </div>
        </div>
    )
}