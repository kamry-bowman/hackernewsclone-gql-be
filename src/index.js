const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, args) => {
      return links.filter(link => link.id === args.id)[0];
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      links = links.map(link => {
        if (link.id === args.id) {
          return { ...link, ...args };
        } else {
          return link;
        }
      });
      return links.filter(link => link.id === args.id)[0];
    },
    deleteLink: (parent, args) => {
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (args.id === link.id) {
          links.splice(i, 1);
          return link;
        }
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers
});
server.start(() => console.log('Server is running on 4000'));
