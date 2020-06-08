import styled from 'styled-components'

export const StyledContainer = styled.div`
    border: 3px solid #fff;
    position: fixed;
    width: 100%:
    z-index: 20;
    background-color: transparent;
    bottom: 0;
`

export const StyledContactLink = styled.a`
  background-color: #000;
  display: inline-block;
  padding: 2em 1em;
  font-size: 20px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  transition: all 0.25s ease-in-out;
  right: 0;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }

  @media screen and (max-width: 768px) {
    padding: 0.5em 1em;
  }
`
