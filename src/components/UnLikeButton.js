import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function UnLikeButton({ user, post: { id, unlikeCount, unlikes } }) {
  const [unliked, setUnLiked] = useState(false);

  useEffect(() => {
    if (user && unlikes.find((unlike) => unlike.username === user.username)) {
      setUnLiked(true);
    } else setUnLiked(false);
  }, [user, unlikes]);

  const [unlikePost] = useMutation(UNLIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const unlikeButton = user ? (
    unliked ? (
      <Button color="teal">
        <Icon name="arrow alternate circle down outline" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="arrow alternate circle down outline" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="arrow alternate circle down outline" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={unlikePost}>
      <MyPopup content={unliked ? 'Unlike' : 'Like'}>{unlikeButton}</MyPopup>
      <Label basic color="teal" pointing="left">
        {unlikeCount}
      </Label>
    </Button>
  );
}

const UNLIKE_POST_MUTATION = gql`
  mutation unlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      id
      unlikes {
        id
        username
      }
      unlikeCount
    }
  }
`;

export default UnLikeButton;
