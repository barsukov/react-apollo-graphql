import React from 'react';
import { gql, graphql } from 'react-apollo';
import { postDetailsQuery } from './PostDetails';
import { withRouter } from 'react-router';

const AddComment = ({ match, mutate }) => {
    const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({
        variables: {
          comment: {
            postId: match.params.postId,
            text: evt.target.value
          }
        },
        optimisticResponse: {
          addComment: {
            text: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Comment',
          },
        },
        update: (store, { data: { addComment } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: postDetailsQuery,
            variables: {
              postId: match.params.postId,
            }
          });
          // Add our Comment from the mutation to the end.
          if (!data.post.comments.find((comment) => comment.id === addComment.id))
          {
            // Add our Comment from the mutation to the end.
            data.post.comments.push(addComment);
          }
          // Write the data back to the cache.
          store.writeQuery({
            query: postDetailsQuery,
            variables: {
              postId: match.params.postId,
            },
            data
          });
        },
      });
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

const addCommentMutation = gql`
  mutation addComment($comment: CommentInput!) {
    addComment(comment: $comment) {
      id
      text
    }
  }
`;

const AddCommentWithMutation = graphql(
  addCommentMutation,
)(withRouter(AddComment));

export default AddCommentWithMutation;