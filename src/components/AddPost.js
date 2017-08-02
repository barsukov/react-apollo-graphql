// src/resolvers.js
import React from 'react';
import { gql, graphql } from 'react-apollo';

import { postsListQuery } from './PostListWithData.js';

const AddPost = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({ 
        variables: { name: evt.target.value },
        optimisticResponse: {
          addPost: {
            name: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Post',
          },
        },
        update: (store, { data: { addPost } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({query: postsListQuery });
          // Add our post from the mutation to the end.
          data.posts.push(addPost);
          // Write the data back to the cache.
          store.writeQuery({ query: postsListQuery, data });
        },
      })
      .then( res => {
        evt.target.value = '';  
      });
    }
  };

  return (
      <input
        type="text"
        placeholder="New Post"
        onKeyUp={handleKeyUp}
      />
    );
};

const addPostMutation = gql`
  mutation addPost($name: String!) {
    addPost(name: $name) {
      id
      name
    }
  }
`;
const AddPostWithMutation = graphql(
  addPostMutation
)(AddPost);

export default AddPostWithMutation;