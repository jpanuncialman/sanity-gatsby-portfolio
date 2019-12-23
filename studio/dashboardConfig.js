export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e0003e499332e40cfb5fe6d',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-iprjzdu9',
                  apiId: '073606b4-4563-4df7-ba77-96a9189f1311'
                },
                {
                  buildHookId: '5e0003e4ac0a3c39d765cca4',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-5doikr1k',
                  apiId: '7304d050-1855-463f-bfc9-4382bea43ae7'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jpanuncialman/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-5doikr1k.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
