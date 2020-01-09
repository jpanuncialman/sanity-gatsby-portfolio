import React from 'react'

import styles from './container.module.css'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background: #000;
  color: #fff;
`

const Container = ({children}) => {
  return (
  <StyledContainer className={styles.root}>
    {children}
    </StyledContainer>
  )
}

export default Container
