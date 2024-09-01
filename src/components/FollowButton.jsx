import { Button, Chip } from "@mui/material";
import { useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { addFollow, deleteFollow } from "../libs/fetcher";
import { useApp } from "../useApp";
import { useNavigate } from "react-router-dom";
export default function FollowButton({ user }) {
  const { auth } = useApp();
  function isFollowing() {
    return user.following.find((item) => item.followerId == auth.id);
  }
  const follow = useMutation(
    (id) => {
      return addFollow(id);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("users");
        await queryClient.refetchQueries("user");
        await queryClient.refetchQueries("search");
      },
    }
  );

  const unfollow = useMutation(
    (id) => {
      return deleteFollow(id);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("users");
        await queryClient.refetchQueries("user");
        await queryClient.refetchQueries("search");
      },
    }
  );

  if (!auth) return false;

  return auth.id === user.id ? (
    false
  ) : (
    <Button
      size="small"
      edge="end"
      variant={isFollowing() ? "outlined" : "contained"}
      sx={{ borderRadius: 5 }}
      onClick={(e) => {
        if (isFollowing()) {
          unfollow.mutate(user.id);
        } else {
          follow.mutate(user.id);
        }
        e.stopPropagation();
      }}
    >
      {isFollowing() ? "Following" : "Follow"}
    </Button>
  );
}
