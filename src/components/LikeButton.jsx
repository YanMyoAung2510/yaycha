import { IconButton, ButtonGroup, Button } from "@mui/material";
import {
  Favorite as LikedIcon,
  FavoriteBorder as LikeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../ThemedApp";
import { useMutation } from "react-query";
import {
  addPostLike,
  deletePostLike,
  addCommentLike,
  deleteCommentLike,
} from "../libs/fetcher";
import { useApp } from "../useApp";

export default function LikeButton({ item, comment }) {
  const navigate = useNavigate();
  const { auth } = useApp();

  // function isLiked() {
  //   if (!auth) return false;
  //   if (!item.PostLike) return false;
  //   return item.PostLike.find((like) => like.userId == auth.id);
  // }

  function isLiked() {
    if (!auth) return false;

    if (comment) {
      // Check if the comment is liked
      return (
        item.CommentLike &&
        item.CommentLike.find((like) => like.userId === auth.id)
      );
    } else {
      // Check if the post is liked
      return (
        item.PostLike && item.PostLike.find((like) => like.userId === auth.id)
      );
    }
  }

  const likePost = useMutation((id) => addPostLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("posts");
    },
  });

  const unlikePost = useMutation((id) => deletePostLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("posts");
    },
  });

  const likeComment = useMutation((id) => addCommentLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });

  const unlikeComment = useMutation((id) => deleteCommentLike(id), {
    onSuccess: () => {
      queryClient.refetchQueries("comments");
    },
  });

  return (
    <ButtonGroup>
      {isLiked() ? (
        <IconButton
          size="small"
          onClick={(e) => {
            comment
              ? unlikeComment.mutate(item.id)
              : unlikePost.mutate(item.id);
            e.stopPropagation();
          }}
        >
          <LikedIcon fontSize="small" color="error" />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          onClick={(e) => {
            comment ? likeComment.mutate(item.id) : likePost.mutate(item.id);
            e.stopPropagation();
          }}
        >
          <LikeIcon fontSize="small" color="error" />
        </IconButton>
      )}
      <Button
        onClick={(e) => {
          if (comment) {
            navigate(`/likes/${item.id}/comment`);
          } else {
            navigate(`/likes/${item.id}/post`);
          }
          e.stopPropagation();
        }}
        sx={{ color: "text.fade" }}
        variant="text"
        size="small"
      >
        {/* {item.PostLike ? item.PostLike.length : null}
        {item.CommentLike ? item.CommentLike.length : 0} */}
        {/* {item.PostLike ? item.PostLike.length : 0} */}
        {item.CommentLike
          ? item.CommentLike.length
          : item.PostLike
          ? item.PostLike.length
          : 0}
      </Button>
    </ButtonGroup>
  );
}
