import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SideList } from "./SideList.jsx";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Paths } from "../../../constants/Paths.js";
import Contact from '../contact';



export const Navbar = () => {
  const [openContact, setOpenContact] = React.useState(false);

  const handleOpenContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

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

          <SideList sx={{ display: "flex", direction: "row" }}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={Paths.HOME}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  href={Paths.ALGORITHM}
                  sx={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText primary="Algorithm" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={Paths.ABOUT}>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleOpenContact}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </SideList>
        </Stack>
      </Box>
      <Contact open={openContact} onClose={handleCloseContact} />
    </Box>
  );
};