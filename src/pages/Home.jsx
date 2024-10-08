import { Alert, Box, Button, Typography } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useApp } from "../useApp";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import {
  deletePost,
  fetchFollowingPosts,
  fetchPosts,
  postPost,
} from "../libs/fetcher";
import { useEffect, useState } from "react";

const api = import.meta.env.VITE_API;

export default function Home() {
  // const navigate = useNavigate();
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  // const [data, setData] = useState([
  //   { id: 3, content: "Yay, interesting.", name: "Chris" },
  //   { id: 2, content: "React is fun.", name: "Bob" },
  //   { id: 1, content: "Hello, World!", name: "Alice" },
  // ]);

  // useEffect(() => {
  //   const api = import.meta.env.VITE_API;

  //   // first method using promise with validation

  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${api}/content/posts`); // setData(await res.json());
  //       const json = await res.json();
  //       setData(json);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();

  //   // second method : mix of async and then
  //   // fetch(`${api}/content/posts`).then(async (res) => {
  //   //   setData(await res.json());
  //   // });
  // }, []);

  // const data = useLoaderData();
  // useEffect(() => {
  //   const api = import.meta.env.VITE_API;
  //   fetch(`${api}/content/posts`)
  //     .then(async (res) => {
  //       if (res.ok) {
  //         setData(await res.json());
  //         setLoading(false);
  //       } else {
  //         setError(true);
  //       }
  //     })
  //     .catch(() => {
  //       setError(true);
  //     });
  // }, []);
  const { showForm, setGlobalMsg, auth } = useApp();
  // const [showLatest, setShowLatest] = useState(true);
  const [showLatest, setShowLatest] = useState(() => {
    const savedState = localStorage.getItem("showLatest");

    return savedState !== null ? JSON.parse(savedState) : true;
  });
  useEffect(() => {
    localStorage.setItem("showLatest", JSON.stringify(showLatest));
  }, [showLatest]);

  const { isLoading, isError, error, data } = useQuery(
    ["posts", showLatest],
    () => {
      if (showLatest) return fetchPosts();
      else return fetchFollowingPosts();
    }
  );
  // const { isLoading, isError, error, data } = useQuery("posts", async () => {
  //   const res = await fetch(`${api}/content/posts`);
  //   return res.json();
  // });

  const remove = useMutation(async (id) => deletePost(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData(["posts", showLatest], (old) =>
        old.filter((item) => item.id !== id)
      );
      setGlobalMsg("A post deleted");
    },
  });

  // const remove = useMutation(
  //   async (id) => {
  //     console.log(id);
  //     await fetch(`${api}/content/posts/${id}`, {
  //       method: "DELETE",
  //     });
  //   },
  //   {
  //     onMutate: (id) => {
  //       queryClient.cancelQueries("posts");
  //       queryClient.setQueryData("posts", (old) =>
  //         old.filter((item) => item.id !== id)
  //       );
  //       setGlobalMsg("A post deleted");
  //     },
  //   }
  // );

  // const add = (content, name) => {
  //   const id = data[0].id + 1;
  //   setData([{ id, content, name }, ...data]);
  //   setGlobalMsg("An item added");
  // };

  // const add = useMutation(async (content) => postPost(content), {
  //   onSuccess: async (post) => {
  //     await queryClient.cancelQueries("posts");
  //     await queryClient.setQueryData("posts", (old) => [post, ...old]);
  //     setGlobalMsg("A post added");
  //   },
  // });

  const add = useMutation(async (content) => postPost(content), {
    onSuccess: async (post) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData(["posts", showLatest], (old) => [
        post,
        ...old,
      ]);
      setGlobalMsg("A post added");
    },
  });

  if (isError) {
    return (
      <Box>
        <Alert severity="warning"> {error.message} </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }
  return (
    <Box>
      {showForm && auth && <Form add={add} />}
      {auth && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Button disabled={showLatest} onClick={() => setShowLatest(true)}>
            Latest
          </Button>
          <Typography sx={{ color: "text.fade", fontSize: 15 }}>|</Typography>
          <Button disabled={!showLatest} onClick={() => setShowLatest(false)}>
            Following
          </Button>
        </Box>
      )}
      {data &&
        data.map((item) => {
          return <Item key={item.id} item={item} remove={remove.mutate} />;
        })}
    </Box>
  );
}
