import styled from 'styled-components'

export const StyledH1 = styled.h1`
    position: fixed;
    right: 1em;
    top: 0;
`

export const StyledContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2%;
`

export const StyledUnorderedList = styled.ul`
    margin: 0;
    padding: 0;
`

export const StyledListItem = styled.li`
    list-style-type: none;
`

export const StyledListItemContainer = styled.div`
    display: flex;
    position: relative;
    margin: 2em 0;
    flex-direction: ${({second}) => second ? 'row-reverse' : 'row'}
    min-height: 750px;
`

export const StyledTextContainer = styled.div`
    position: absolute;
    ${({second}) => second ? 'left: 0' : 'right: 0'}
    max-width: 750px;
    top: 20%;
`

export const StyledListItemImage = styled.img`
    max-width: 1000px;
    height: auto;
    opacity: 0.5;
    transition: all 0.5s ease-in-out;

    &:hover {
        opacity: 1;
        transform: scale(1.05);
    }
`