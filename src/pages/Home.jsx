import { useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useApp } from "../useApp";
import { useLoaderData } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { id } from "date-fns/locale";

const api = import.meta.env.VITE_API;

export default function Home() {
  const { showForm, setGlobalMsg } = useApp();
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

  const { isLoading, isError, error, data } = useQuery("posts", async () => {
    const res = await fetch(`${api}/content/posts`);
    return res.json();
  });

  const remove = useMutation({
    mutationFn: async (id) => {
      await fetch(`${api}/content/posts/${id}`, {
        method: "DELETE",
      });
    },
    onMutate: (id) => {
      queryClient.cancelQueries("posts");
      queryClient.setQueryData("posts", (old) =>
        old.filter((item) => item.id !== id)
      );
      console.log("onMutate");
    },
    onSuccess: (id) => {
      setGlobalMsg("this is success");
      console.log("success");
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

  const add = (content, name) => {
    const id = data[0].id + 1;
    setData([{ id, content, name }, ...data]);
    setGlobalMsg("An item added");
  };

  if (isError) {
    console.log(error);
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
      {showForm && <Form add={add} />}
      {data.map((item) => {
        return <Item key={item.id} item={item} remove={remove.mutate} />;
      })}{" "}
    </Box>
  );
}
