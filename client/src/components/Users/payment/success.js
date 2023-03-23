import { Typography, Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteAll } from "../redux/cartSlice";

const SuccessUrl = () => {
  const dispatch = useDispatch();
  dispatch(deleteAll());

  return (
    <Box>
      <Box>
        <Typography variant="h4">Thank you for shoping with us...</Typography>
      </Box>
      <IconButton size="small">Continue Shoping</IconButton>
    </Box>
  );
};

export default SuccessUrl;
