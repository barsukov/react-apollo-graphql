// src/resolvers.js
const posts = [{
  id: 1,
  name: 'news',
}, {
  id: 2,
  name: 'football',
}];
export const resolvers = {
  Query: {
    posts: () => {
      return posts;
    },
  },
};
