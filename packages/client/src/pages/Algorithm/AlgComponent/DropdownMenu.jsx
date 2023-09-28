import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        onClick={handleClick} 
        variant="contained"
        sx={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#333',
          }
        }}
      >
        More Algorithms
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          className="dropdown-item" 
          onClick={handleClose}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            margin: '5px 0',
            padding: '10px 20px',
            borderRadius: '4px',
            textAlign: 'center',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#333',
            }
          }}
        >
          Dijkstra
        </MenuItem>
        <MenuItem 
          className="dropdown-item" 
          onClick={handleClose}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            margin: '5px 0',
            padding: '10px 20px',
            borderRadius: '4px',
            textAlign: 'center',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#333',
            }
          }}
        >
          BST
        </MenuItem>
        <MenuItem 
          className="dropdown-item" 
          onClick={handleClose}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            margin: '5px 0',
            padding: '10px 20px',
            borderRadius: '4px',
            textAlign: 'center',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#333',
            }
          }}
        >
          Bellman Ford
        </MenuItem>
      </Menu>
    </div>
  );
};
