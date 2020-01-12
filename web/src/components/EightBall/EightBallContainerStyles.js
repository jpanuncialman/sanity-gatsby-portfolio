import styled from 'styled-components'

export const StyledParentContainer = styled.div`
    min-height: ${ ({ minHeight }) => minHeight ? `${minHeight}px` : '500px'  }
`

export const StyledContainer = styled.div`
    max-width: ${ ({ maxWidth }) =>  maxWidth ? `${maxWidth}px` : 'initial' };
    ${'' /* min-height: 500px; */}
    min-height: inherit;
    width: 100%;
`