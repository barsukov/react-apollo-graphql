// src/resolvers.js
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
      const newPost = { id:  String(nextId++), comments: [], name: args.name };
      posts.push(newPost);
      return newPost;
    },
  },
};