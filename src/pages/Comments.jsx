import { useMutation, useQuery } from "react-query";
import { json, useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useApp } from "../useApp";
import { queryClient } from "../ThemedApp";
import Item from "../components/Item";
const api = import.meta.env.VITE_API;
export default function Comments() {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { setGlobalMsg } = useApp();
  const { isLoading, isError, error, data } = useQuery(
    ["comments", postId],
    async () => {
      const res = await fetch(`${api}/content/posts/${postId}`);
      return res.json();
    }
  );

  const removePost = useMutation(async (postId) => {
    await fetch(`${api}/content/posts/${postId}`, {
      method: "DELETE",
    });
    navigate("/");
    setGlobalMsg("A post deleted");
  });
  const removeComment = useMutation(
    async (postId) => {
      await fetch(`${api}/content/comments/${postId}`, {
        method: "DELETE",
      });
    },
    {
      onMutate: (postId) => {
        queryClient.cancelQueries("comments");
        queryClient.setQueryData("comments", (old) => {
          old.comments = old.comments.filter(
            (comment) => comment.postId !== postId
          );
          return { ...old };
        });
        setGlobalMsg("A comment deleted");
      },
    }
  );
  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }
  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }
  return (
    <Box>
      <Item primary item={data} remove={removePost.mutate} />
      {data.comments.map((comment) => {
        return (
          <Item
            key={comment.postId}
            item={comment}
            remove={removeComment.mutate}
          />
        );
      })}
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 3,
          }}
        >
          <TextField multiline placeholder="Your Comment" />
          <Button type="submit" variant="contained">
            Reply
          </Button>
        </Box>
      </form>
    </Box>
  );
}
