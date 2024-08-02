import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useApp } from "../useApp";
export default function Home() {
  const { showForm, setGlobalMsg } = useApp();
  // const [data, setData] = useState([
  //   { id: 3, content: "Yay, interesting.", name: "Chris" },
  //   { id: 2, content: "React is fun.", name: "Bob" },
  //   { id: 1, content: "Hello, World!", name: "Alice" },
  // ]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const api = import.meta.env.VITE_API;

    // first method using promise with validation

    const fetchData = async () => {
      try {
        const res = await fetch(`${api}/content/posts`); // setData(await res.json());
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // second method : mix of async and then
    // fetch(`${api}/content/posts`).then(async (res) => {
    //   setData(await res.json());
    // });
  }, []);
  // console.log(item);
  const remove = (id) => {
    setData(data.filter((item) => item.id !== id));
    setGlobalMsg("An item deleted");
  };
  const add = (content, name) => {
    const id = data[0].id + 1;
    setData([{ id, content, name }, ...data]);
    setGlobalMsg("An item added");
  };
  return (
    <Box>
      {showForm && <Form add={add} />}
      {data.map((item) => {
        return <Item key={item.id} item={item} remove={remove} />;
      })}{" "}
    </Box>
  );
}
