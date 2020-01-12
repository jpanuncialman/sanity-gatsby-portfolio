import React from 'react'

import styles from './container.module.css'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background: #000;
  color: #fff;
`

const Container = (props) => {
  return (
  <StyledContainer location={props.location} className={styles.root}>
    {props.children}
    </StyledContainer>
  )
}

export default Container
