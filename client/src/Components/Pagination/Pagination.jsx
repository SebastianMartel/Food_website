import './Pagination.css'
import styled from "styled-components";
//__________________________________________________

const StyledDiv = styled.div`
`

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
        <StyledDiv>
            <div className = 'navPage'>
                {
                    searching === true
                    ? (
                        pageNumbersSearchResults.map((number) => {
                            return (
                                    <a className = 'pageBox' href = '#!' onClick = {() => {paginate(number)}}>
                                        <div className = 'pageNumber'>
                                                {number}
                                        </div>
                                    </a>
                            )
                        })
                    )
                    : pageNumbersAllRecipes.map((number) => {
                        return (
                                <a className = 'pageBox' href = '#!' onClick = {() => {paginate(number)}}>
                                    <div className = 'pageNumber'>
                                            {number}
                                    </div>
                                </a>
                        )
                    })
                }
            </div>
        </StyledDiv>
    )
}