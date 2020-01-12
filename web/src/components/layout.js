import React from 'react'
import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = (props) => {
  console.log(props)
  return (
  
    <>
      { props.location !== "/" && <Header siteTitle={props.siteTitle} onHideNav={props.onHideNav} onShowNav={props.onShowNav} showNav={props.showNav} /> }
      <div className={styles.content}>{props.children}</div>
    </>
  )
  }

export default Layout
