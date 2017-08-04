import { makeExecutableSchema,addMockFunctionsToSchema } from 'graphql-tools';
const typeDefs = `
type Post {
   id: ID!                # "!" denotes a required field
   name: String
   comments: [Comment]!
}

input CommentInput{
  postId: ID!
  text: String
}

type Comment {
  id: ID!
  text: String
}

# This type specifies the entry points into our API. In this case
# there is only one - "posts" - which returns a list of posts.
type Query {
   posts: [Post]    # "[]" means this is a list of posts
   post(id: ID!): Post
}

type Subscription {
  commentAdded(postId: ID!): Comment
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addPost(name: String!): Post
  addComment(comment: CommentInput!): Comment
}
`;
import { resolvers } from './resolvers';
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };