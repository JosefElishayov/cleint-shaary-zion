import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Box } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [date, setDate] = React.useState(new Date());
    return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Box color="text.secondary" sx={{ flex: 1 }}>
       {date.toLocaleDateString()}
      </Box>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
