export default function Pagination ( { recipesPerPage, totalRecipes, paginate } ) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                {
                    pageNumbers.map((number) => {
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