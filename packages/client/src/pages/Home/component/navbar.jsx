import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SideList } from "./SideList.jsx";
import { Stack, Typography } from "@mui/material";
import { Paths } from "../../../constants/Paths.js";
import Contact from "../contact";
import { useAuth } from "../../../context/auth.context.jsx";
import { useState } from "react";

export const Navbar = () => {
  const { token } = useAuth();
  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const configs = [
    {
      name: "Home",
      path: Paths.HOME,
      action: null,
    },
    {
      name: "Algorithm",
      path: Paths.ALGORITHM,
      action: null,
    },
    {
      name: "About",
      path: Paths.ABOUT,
      action: null,
    },
    {
      name: "Contact",
      action: handleOpenContact,
    },
  ];

  return (
    <Box>
      {/* Grey navbar section */}
      <Box sx={{ bgcolor: "grey.200", paddingX: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Algo-Shadow</Typography>
          <Stack direction="row">
            <SideList sx={{ display: "flex", direction: "row" }}>
              {configs.map((config) => (
                <ListItem disablePadding key={config.name}>
                  <ListItemButton onClick={config.action ? config.action : () => { window.location.href = config.path }}>
                    <ListItemText primary={config.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </SideList>
            <SideList sx={{ display: "flex", direction: "row" }}>
              {token ? (
                <ListItem disablePadding>
                  <ListItemButton href={Paths.LOGOUT}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton href={Paths.LOGIN}>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              )}
            </SideList>
          </Stack>
        </Stack>
      </Box>
      <Contact open={openContact} onClose={handleCloseContact} />
    </Box>
  );
};
