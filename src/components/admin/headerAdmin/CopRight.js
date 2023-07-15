import { Box, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


export default function Copyright(props) {
  return (
    <Box sx={{paddingY:"24px"}}>
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {' מערכת ניהול סניפים ותרומות שערי ציון '  }
      {/* <Link  color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Box>
  );
}