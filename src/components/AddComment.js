import React from 'react';
import { gql, graphql } from 'react-apollo';
import { postDetailsQuery } from './PostDetails';
import { withRouter } from 'react-router';

const AddComment = ({ match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.target.value = '';
    }
  };

  return (
    <div className="commentInput">
      <input
        type="text"
        placeholder="New comment"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default withRouter(AddComment);