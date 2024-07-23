import { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
// import { green } from "@mui/material/colors";

export default function Form({ add }) {
  const contentRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const content = contentRef.current.value;
        add(content, "Alice");
        e.currentTarget.reset();
      }}
    >
      <Box sx={{ mb: 4, textAlign: "right" }}>
        {/* <TextField
          inputRef={contentRef}
          type="text"
          placeholder="Content"
          fullWidth
          multiline
          sx={{ mb: 1, overflow: "hidden" }}
        /> */}
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel htmlFor="component-outlined">Content</InputLabel>
          <OutlinedInput
            inputRef={contentRef}
            color="success"
            id="component-outlined"
            defaultValue=""
            label="Content"
          />
        </FormControl>
        <Button
          color="success"
          variant="outlined"
          type="submit"
          endIcon={<SendIcon />}
        >
          Post
        </Button>
      </Box>
    </form>
  );
}
