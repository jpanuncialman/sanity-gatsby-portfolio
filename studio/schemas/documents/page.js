
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'header',
      title: 'Page Header',
      type: 'string'
    },
    {
			name: 'subheader',
			title: 'Page Subheader',
			type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText'
    }
  ]
}
