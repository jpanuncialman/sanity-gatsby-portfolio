import React from 'react'
import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'
import ContactLink from './ContactLink/ContactLink'

import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const Layout = props => {
  // console.log(props)
  return (
    <>
      {props.location !== '/' && (
        <Header
          siteTitle={props.siteTitle}
          onHideNav={props.onHideNav}
          onShowNav={props.onShowNav}
          showNav={props.showNav}
        />
      )}
      <StyledContainer>
        <div className={styles.content}>{props.children}</div>
      </StyledContainer>

      <ContactLink />
    </>
  )
}

export default Layout
