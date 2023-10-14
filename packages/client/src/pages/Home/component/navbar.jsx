import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SideList } from "./SideList.jsx";
import { Stack, Typography } from "@mui/material";
import { DropdownMenu } from "../../Algorithm/AlgComponent/DropdownMenu";
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <Box>
      {/* Grey navbar section */}
      <Box sx={{ bgcolor: "grey.200", paddingX: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
          alignItems="center"
        >
          <Typography variant="h5">Algo-Shadow</Typography>
          
          <SideList sx={{ display: "flex", direction: "row" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </SideList>
        </Stack>
      </Box>
      
      {/* Conditionally render DropdownMenu */}
      {location.pathname !== '/' && <DropdownMenu />}
    </Box>
  );
};
