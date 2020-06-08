import styled from 'styled-components'

export const StyledH1 = styled.h1`
  position: fixed;
  right: 1em;
  top: 0;
  z-index: 3;
`

export const StyledHeaderLink = styled.a`
  color: #fff;
  display: inline-block;
  opacity: 1;
  text-decoration: none;
  transition: all 0.5s ease-in-out;
  position: relative;

  &::after {
    bottom: 0;
    display: block;
    position: absolute;
    background: #fff;
    content: '';
    height: 2px;
    width: 0%;
    transition: all 0.5s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  @media screen and (max-width: 568px) {
    width: 100%;
  }
`

export const StyledContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
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
    margin: 3em 0;
    flex-direction: ${({second}) => (second ? 'row-reverse' : 'row')}
    min-height: 750px;
    div {
        width: 100%;
        max-width: 1000px;
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        min-height: unset;
    }

    @media screen and (max-width: 568px) {
        font-size: 12px;
    }
    
`

export const StyledPostHeader = styled.h2`
  margin: 0;
  @media screen and (max-width: 768px) {
    width: 96%;
    margin: 0 auto;
  }
`

export const StyledTextContainer = styled.div`
  position: absolute;
  ${({second}) => (second ? 'left: 0' : 'right: 0')}
  max-width: 750px;
  top: 20%;

  p {
    width: 96%;
    margin: 1em auto;
  }

  @media screen and (max-width: 768px) {
    position: initial;
  }
`

export const StyledListItemImage = styled.img`
  height: auto;
  opacity: 0.5;
  transition: all 0.5s ease-in-out;
  width: 100%;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`
