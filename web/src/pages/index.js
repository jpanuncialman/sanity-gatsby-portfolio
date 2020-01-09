import React, { useEffect } from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import EightBallContainer from '../components/EightBall/EightBallContainer'



export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    index: sanityIndex(id: {eq: "b7e5265c-840c-5bf6-ab2a-a2f1ad10e98a"}) {
      id
      header
      subheader
      threeObj {
        asset {
          url
        }
      }
    }
  }
`

const shakeEventDidOccur = () => {

  //put your own code here etc.
  alert('shake!');
}


// const detectShake = () => {

//     var current = e.accelerationIncludingGravity;
//     var currentTime;
//     var timeDifference;
//     var deltaX = 0;
//     var deltaY = 0;
//     var deltaZ = 0;

//     if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
//         this.lastX = current.x;
//         this.lastY = current.y;
//         this.lastZ = current.z;
//         return;
//     }

//     deltaX = Math.abs(this.lastX - current.x);
//     deltaY = Math.abs(this.lastY - current.y);
//     deltaZ = Math.abs(this.lastZ - current.z);

//     if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
//         //calculate time in milliseconds since last shake registered
//         currentTime = new Date();
//         timeDifference = currentTime.getTime() - this.lastTime.getTime();

//         if (timeDifference > this.options.timeout) {
//             window.dispatchEvent(this.event);
//             this.lastTime = new Date();
//         }
//     }

//     this.lastX = current.x;
//     this.lastY = current.y;
//     this.lastZ = current.z;


// }

const IndexPage = props => {
  const {data, errors} = props
  
  if (typeof window === 'undefined') {
    global.window = {}
  }

  useEffect(() => {
    return function cleanup() {
      window.removeEventListener('devicemotion', shakeEventDidOccur, false)
    }
  })
  
  if ('ondevicemotion' in window) {
    window.addEventListener('devicemotion', shakeEventDidOccur, false);
  }




  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  // const projectNodes = (data || {}).projects
  //   ? mapEdgesToNodes(data.projects)
  //     .filter(filterOutDocsWithoutSlugs)
  //     .filter(filterOutDocsPublishedInTheFuture)
  //   : []

  const indexData = (data || {}).index;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  console.log(indexData);

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        {/* <h1 hidden>Welcome to {site.title}</h1> */}
        <h1>{indexData.header}</h1>
        <h2>{indexData.subheader}</h2>
        <EightBallContainer path={ indexData.threeObj.asset.url }/>
        
        {/*projectNodes && (
          <ProjectPreviewGrid
            title='Latest projects'
            nodes={projectNodes}
            browseMoreHref='/archive/'
          />
        )*/}
      </Container>
    </Layout>
  )
}

export default IndexPage
