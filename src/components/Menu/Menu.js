import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {menuItems, buttonLabel} = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (click) => {
    handleClose()
    click()
  };


  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Project
      </Button>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {buttonLabel}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map(menu => <MenuItem onClick={menu.onClick} >{menu.label} {menu.status ? <CheckIcon /> : <CloseIcon />} </MenuItem>)}
      </Menu>
    </div>
  );
}
