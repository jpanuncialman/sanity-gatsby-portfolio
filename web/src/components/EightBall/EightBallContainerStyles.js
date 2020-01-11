import styled from 'styled-components'

export const StyledContainer = styled.div`
    max-width: ${ ({ maxWidth }) =>  maxWidth ? maxWidth : 'initial' };
    min-height: 500px;
    width: 100%;
`