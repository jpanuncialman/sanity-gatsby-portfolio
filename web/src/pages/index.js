import React from 'react'
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

import Shake from '../../static/js/shake'

const myShakeEvent = new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 1000 // optional, determines the frequency of event generation
});


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

const IndexPage = props => {
  const {data, errors} = props
  myShakeEvent.start()
  window.addEventListener('shake', shakeEventDidOccur, false)




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
