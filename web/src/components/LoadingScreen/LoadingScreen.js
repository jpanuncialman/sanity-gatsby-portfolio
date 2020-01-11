import React, { useEffect } from 'react'
import { StyledLoadingContainer, StyledLoadingHeader } from './LoadingScreenStyles'

const LoadingScreen = props => {
    return(
        <StyledLoadingContainer>
            <StyledLoadingHeader>
                Loading...
            </StyledLoadingHeader>
        </StyledLoadingContainer>
    )
}

export default LoadingScreen