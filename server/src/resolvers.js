import { PubSub, withFilter } from 'graphql-subscriptions';

const posts = [{
  id: '1',
  name: 'news',
  comments: [{
    id: '1',
    text: 'LOOL',
  }]
}, {
  id: '2',
  name: 'football',
  comments: [{
    id: '2',
    text: 'baseball is life',
  }]
}];

let nextId = 3;
let nextCommentId = 3;
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    posts: () => {
      return posts;
    },
    post: (root, { id }) => {
      return posts.find(post => post.id === id);
    },
  },
  Mutation: {
    addPost: (root, args) => {
      const newPost = { id: String(nextId++), comments: [], name: args.name };
      posts.push(newPost);
      return newPost;
    },
    addComment: (root, { comment }) => {
      const post = posts.find(post => post.id === comment.postId);
      if(!post)
        throw new Error("post does not exist");
      const newComment = { id: String(nextCommentId++), text: comment.text };
      post.comments.push(newComment);

      pubsub.publish('commentAdded', { commentAdded: newComment, postId: comment.postId });
      return newComment;
    },
  },
  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('commentAdded'),
        (payload, variables) => {
          return payload.postId === variables.postId;
        }
      )
    }
  }
};