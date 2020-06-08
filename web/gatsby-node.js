const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanitySampleProject(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.allSanitySampleProject || {}).edges || [];

  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id;
      const slug = edge.node.slug.current;
      const path = `/project/${slug}/`;

      reporter.info(`Creating project page: ${path}`);

      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: { id, slug }
      });
    });
}

async function createSitePages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            id
            header
            subheader
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityPage || {}).edges || [];

  pageEdges.forEach(edge => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/${slug}/`;

    reporter.info(`Creating project page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id }
    });
  });
}

async function createSiteCategories(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityCategory(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const categoryEdges = (result.data.allSanityCategory || {}).edges || [];

  categoryEdges.forEach(edge => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/${slug}/`;

    reporter.info(`Creating category page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/category.js"),
      context: { slug }
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter);
  await createSitePages(graphql, actions, reporter);
  await createSiteCategories(graphql, actions, reporter);
};

// exports.onCreateWebpackConfig = ({
//   stage,
//   rules,
//   loaders,
//   plugins,
//   actions,
// }) => {
//   actions.setWebpackConfig({
//     module: {
//       rules:[
//         {
//           test: /\.(gltf)$/,
//           use: [
//             {
//               loader: "gltf-webpack-loader"
//             }
//           ]
//         },
//         {
//           // here I match only IMAGE and BIN files under the gltf folder
//           test: /gltf.*\.(bin|png|jpe?g|gif)$/,
//           // or use url-loader if you would like to embed images in the source gltf
//           loader: 'file-loader',
//           options: {
//             // output folder for bin and image files, configure as needed
//             name: 'gltf/[name].[hash:7].[ext]'
//           }
//         }
//       ]
//     }
// })
// }
