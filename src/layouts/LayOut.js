import React from "react";
import { Box } from "@mui/material";

function LayOut({ children }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      <Box sx={{ width: "75%", border: "1px solid white" }}>{children}</Box>
    </div>
  );
}

export default LayOut;
