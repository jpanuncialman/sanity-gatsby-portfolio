import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query MyQuery($id: String!) {
    sanityPage(id: { eq: $id }) {
      id
      header
      subheader
      body {
        sanityChildren {
          text
        }
      }
    }
  }
`;

const PageTemplate = props => {
  const { data, errors } = props;
  const page = data && data.sanityPage;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {page && (
        <div>
          <h1>{page.header}</h1>
          <h2>{page.subheader}</h2>
        </div>
      )}
    </Layout>
  );
};

export default PageTemplate;
