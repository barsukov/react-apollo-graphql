// src/resolvers.js
import React from 'react';
import { gql, graphql } from 'react-apollo';

const AddPost = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({ 
        variables: { name: evt.target.value }
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
