import {Link} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'
import EightBallContainer from './EightBall/EightBallContainer'
import {Location} from '@reach/router'

// import styles from './header.module.css'
import {EightBallContainerWrapper} from './HeaderStyles'

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => (
  <div>
    <Location>
      {({location}) => {
        {
          /* console.log(location) */
        }
        return location && location.pathname !== '/' ? (
          <EightBallContainer minHeight={'200'} maxWidth={'200'} />
        ) : null
      }}
    </Location>

    {/* <div className={styles.wrapper}>
      <div className={styles.branding}>
        {/* <Link to='/'>{siteTitle}</Link>
      </div>

    </div> */}
  </div>
)

export default Header
