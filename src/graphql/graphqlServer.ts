import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
    type Author {
        name: String
        role: String
        avatarUrl: String    
    }

  type OwnComment {
    name: String
    role: String
    avatarUrl: String
    content: String
  }

  type Post {
    author: Author
    content: String
    comments: [OwnComment]
  }
  
  type Query {
    getPosts: [Post]
  }
`;

// const resolvers = {
//   Query: {
//     async getPosts(){
//         return await Post.find()
//     }
//   },
// };

const customServer = new ApolloServer({ typeDefs,  });

export default customServer;