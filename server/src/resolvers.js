// src/resolvers.js
const posts = [{
  id: 1,
  name: 'news',
}, {
  id: 2,
  name: 'football',
}];

let nextId = 3;

export const resolvers = {
  Query: {
    posts: () => {
      return posts;
    },
  },
  Mutation: {
    addPost: (root, args) => {
      const newPost = { id: nextId++, name: args.name };
      posts.push(newPost);
      return newPost;
    },
  },
};