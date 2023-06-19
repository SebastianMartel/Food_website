import styled from "styled-components";
//__________________________________________________

const StyledDiv = styled.div`
`

const StyledSpan = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: center;

    gap: 3rem;
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
            <StyledSpan>
                {
                    searching === true
                    ? (
                        pageNumbersSearchResults.map((number) => {
                            return (
                                <p>
                                    <a href = '#!' onClick = {() => {paginate(number)}}>
                                        {number}
                                    </a>
                                </p>
                            )
                        })
                    )
                    : pageNumbersAllRecipes.map((number) => {
                        return (
                            <p>
                                <a href = '#!' onClick = {() => {paginate(number)}}>
                                    {number}
                                </a>
                            </p>
                        )
                    })
                }
            </StyledSpan>
        </StyledDiv>
    )
}