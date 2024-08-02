import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import {
  Alarm as TimeIcon,
  AccountCircle as UserIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
export default function Item({ item, remove, primary }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ mb: 2 }}>
      {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
      <CardContent onClick={() => navigate("/comments/1")}>
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TimeIcon fontSize="10" color="success" />
            <Typography variant="caption" sx={{ color: "green" }}>
              {formatRelative(item.created, new Date())}{" "}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={(e) => {
              remove(item.id);
              e.stopPropagation();
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Typography sx={{ my: 3, overflow: "hidden", mr: 2.2 }}>
          {item.content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <UserIcon fontSize="12" color="warning" />
          <Typography variant="caption">{item.users.name}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
