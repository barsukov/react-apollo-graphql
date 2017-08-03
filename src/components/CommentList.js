import React from 'react';
import AddComment from './AddComment';

const CommentList = ({ comments }) => {
  return (
    <div className="commentsList">
      { comments.map( comment =>
        (<div key={comment.id} className={'comment ' + (comment.id < 0 ? 'optimistic' : '')}>
            {comment.text}
        </div>)
      )}
      <AddComment />
    </div>
  );
};
export default (CommentList);