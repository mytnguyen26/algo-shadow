import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Menu, Stack } from "@mui/material";
import { Paths } from "../../../constants/paths.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const dropDownData = [
  {
    id: 0,
    name: "Hash",
    path: Paths.HASH,
  },
  {
    id: 1,
    name: "Dijkstra",
    path: Paths.DIJKSTRA,
  },
  {
    id: 2,
    name: "BST",
    path: Paths.BST,
  },
  {
    id: 3,
    name: "Bellman Ford",
    path: Paths.DIJKSTRA,
  },
  {
    id: 4,
    name: "Heap",
    path: Paths.HEAP,
  },
];

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" sx={{ paddingY: 5 }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Algorithm
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {dropDownData.map((data) => {
          return (
            <MenuItem
              key={data.id}
              value={data.id}
              onClick={() => navigate(data.path)}
            >
              {data.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
};
