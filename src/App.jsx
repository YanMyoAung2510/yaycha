import { useContext, useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import Form from "./components/Form";
import Item from "./components/Item";
import { AppContext } from "./ThemedApp";
// import { useApp } from "./ThemedApp";
export default function App() {
  const { showForm, setGlobalMsg } = useContext(AppContext);
  const [data, setData] = useState([
    { id: 3, content: "Yay, interesting.", name: "Chris" },
    { id: 2, content: "React is fun.", name: "Bob" },
    { id: 1, content: "Hello, World!", name: "Alice" },
  ]);
  const remove = (id) => {
    setData(data.filter((item) => item.id !== id));
    setGlobalMsg("An item deleted");
  };
  const add = (content, name) => {
    const id = data[0].id + 1;
    if (!content) {
      setGlobalMsg("please write shits");
    } else {
      setData([{ id, content, name }, ...data]);
      setGlobalMsg("An item added");
    }
  };
  console.log(data);
  return (
    <Box sx={{ height: "2000px" }}>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {showForm && <Form add={add} />}
        {data.map((item) => {
          return <Item key={item.id} item={item} remove={remove} />;
        })}
      </Container>
    </Box>
  );
}
