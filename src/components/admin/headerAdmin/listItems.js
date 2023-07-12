import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
export const mainListItems = (
  <React.Fragment>
    <ListItemButton >
      <Link to={"/admin"}   className="list" >
        <Box sx={{ display: "flex", }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Typography >
            ראשי
          </Typography>
        </Box>
      </Link>
    </ListItemButton>
    <ListItemButton >
      <Link to={"/admin/donationsList"} className="list">
        <Box sx={{ display: "flex", }}>
          <ListItemIcon>
            <VolunteerActivismIcon />
          </ListItemIcon>
          <Typography >
            תרומות
          </Typography>
        </Box>
      </Link>
    </ListItemButton>
    <ListItemButton >
      <Link to={"/admin/branchList"} className="list ">
        <Box sx={{ display: "flex", }}>
          <ListItemIcon>
            <HolidayVillageIcon />
          </ListItemIcon>
          <Typography >
            סניפים
          </Typography>
        </Box>
      </Link>
    </ListItemButton>
    <ListItemButton >
      <Link to={"/admin/usersList"} className="list ">
        <Box sx={{ display: "flex", }}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Typography >
            משתמשים
          </Typography>
        </Box>
      </Link>
    </ListItemButton>
    <ListItemButton >
      <Link to={"/admin/contactList"} className="list ">
        <Box sx={{ display: "flex", }}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <Typography >
            הודעות
          </Typography>
        </Box>
      </Link>
    </ListItemButton>
    <ListItemButton>
    <Link to={"/admin/purchase"} className="list ">
        <Box sx={{ display: "flex", }}>
          <ListItemIcon>
          <AssignmentIcon />
          </ListItemIcon>
          <Typography >
            דוח תרומות
          </Typography>
        </Box>
      </Link>
      </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader
      component="div"
      sx={{ marginRight: '100px' }}
      inset>
      דוחות שמורים
    </ListSubheader>
    <ListItemButton >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
