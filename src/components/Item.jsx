import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import {
  Alarm as TimeIcon,
  AccountCircle as UserIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import { useApp } from "../useApp";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

export default function Item({
  item,
  remove,
  primary,
  comment,
  showDeleteButton = true,
}) {
  const navigate = useNavigate();
  const { setGlobalMsg } = useApp();

  return (
    <Card sx={{ mb: 2 }}>
      {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
      <CardContent
        onClick={() => {
          navigate(`/comments/${item.id}`);
        }}
      >
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

          {showDeleteButton && ( // Conditionally render the delete button
            <IconButton
              size="small"
              onClick={(e) => {
                remove(item.id);
                e.stopPropagation();
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
        <Typography sx={{ my: 3, overflow: "hidden", mr: 2.2 }}>
          {item.content}
        </Typography>
        {showDeleteButton && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              onClick={(e) => {
                navigate(`/profile/${item.users.id}`);
                e.stopPropagation();
              }}
              sx={{
                ":hover": {
                  color: "gray",
                  transition: "0.3s",
                  cursor: "pointer",
                },
                transition: "0.3s",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <UserIcon fontSize="12" color="warning" />
              <Typography variant="caption">{item.users.name}</Typography>
            </Box>
            <Box>
              <LikeButton item={item} comment={comment} />
              <CommentButton item={item} comment={comment} />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
