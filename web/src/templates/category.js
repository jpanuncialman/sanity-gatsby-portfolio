import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Project from '../components/project'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BlockText from '../components/block-text'

import { 
  StyledH1,
  StyledContainer, 
  StyledUnorderedList, 
  StyledListItem,
  StyledListItemContainer,
  StyledPostHeader,
  StyledTextContainer,
  StyledListItemImage
} from './category-styles'

export const query = graphql`
query MyCategoryQuery($slug: String!) {
    projects: allSanitySampleProject(
      limit: 12
      sort: {fields: [publishedAt], order: DESC}
      filter: {categories: {elemMatch: {slug: {current: {eq: $slug}}}}}
    ) {
      edges {
        node {
          id
          title
          _rawExcerpt
          slug {
            current
          }
          mainImage {
            asset {
              url
            }
          }
          _rawMainImageCaption
          imageTwo {
            asset {
              url
            }
          }
          _rawImageTwoCaption
          imageThree {
            asset {
              url
            }
          }
          _rawImageThreeCaption
        }
      }
    },
    category: sanityCategory(slug: {current: {eq:$slug}}) {
        title
        id
      }
  }
  
`

const CategoryTemplate = props => {
  const {data, errors} = props
  const category = data && data.category.title
  const posts = data && data.projects.edges.map(post => {
      return (
        <StyledListItem>
          <StyledPostHeader>
            {post.node.title}
          </StyledPostHeader>
          <StyledListItemContainer first={true}>
            {post.node.mainImage && <div>
              <StyledListItemImage src={post.node.mainImage.asset.url} />
            </div>}
            {post.node._rawMainImageCaption && (
              <StyledTextContainer first={true}>
                <BlockText className="category__list-item-block category__list-item-block-first" blocks={post.node._rawMainImageCaption} />
              </StyledTextContainer>
            )}
          </StyledListItemContainer>
          <StyledListItemContainer second={true}>
            {post.node.mainImage && <div>
              <StyledListItemImage src={post.node.mainImage.asset.url} />
            </div>}
            {post.node._rawImageTwoCaption && (
              <StyledTextContainer second={true}>
                <BlockText className="category__list-item-block category__list-item-block-first" blocks={post.node._rawImageTwoCaption} />
              </StyledTextContainer>
            )}
          </StyledListItemContainer>
          <StyledListItemContainer>
            {post.node._rawImageThreeCaption && <div>
              <StyledListItemImage src={post.node.imageThree.asset.url} />
            </div>}
            {post.node._rawImageThreeCaption && (
              <StyledTextContainer>
                <BlockText className="category__list-item-block category__list-item-block-second" blocks={post.node._rawImageThreeCaption} />
              </StyledTextContainer>
            )}
            </StyledListItemContainer>
        </StyledListItem>
      )
  })
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      
      <StyledContainer>
        {category && (
          <div>
              <StyledH1>{category}</StyledH1>
              <StyledUnorderedList>
                  {posts}
              </StyledUnorderedList>
          </div>  
        )
        }
      </StyledContainer>
    </Layout>
  )
}

export default CategoryTemplate
