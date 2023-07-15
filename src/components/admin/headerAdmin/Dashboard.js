// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
// import Copyright from './CopRight.js';
// import { styleRes } from './styleMui';
// function DashboardContent() {
//   return (
//         <Box sx={styleRes}  >
//           <Toolbar />
//           <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Grid container spacing={3}>
//               {/* Chart */}
//               {/* <Grid item xs={12} md={8} lg={9}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: 240,
//                   }}
//                 >
//                   <Chart />
//                 </Paper>
//               </Grid> */}
//               {/* Recent Deposits */}
//               {/* <Grid item xs={12} md={4} lg={3}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     height: 240,
//                   }}
//                 >
//                   <Deposits />
//                 </Paper>
//               </Grid> */}
//               {/* Recent Orders */}
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//                   <Orders />
//                 </Paper>
//               </Grid>
//             </Grid>
//             <Copyright sx={{ pt: 4 }} />
//           </Container>
//         </Box>
//   );
// }
// export default function Dashboard() {
//   return <DashboardContent />;
// }
import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Skeleton } from 'antd';
import { Box, Toolbar } from '@mui/material';
import { API_URL, apiGet } from '../../../services/apiService';
import { styleRes } from './styleMui';
import Copyright from './CopRight';
const { Header, Content, Footer } = Layout;
const array = [null, null, null, null]
const Dashboard = () => {
  const [count, setCount] = useState({})
  useEffect(() => {
    doApi()
  })
  const doApi = async () => {
    // setIsLoading(true);
    const url = API_URL + `/count`;
    const data = await apiGet(url);
    // setIsLoading(false);
    setCount((data));
  };
  const getTotalPercentage = (value) => `${(value / 1000) * 100}%`;
  const dataDashboard = [
    {
      name: "משתמשים",
      backgroundColor: "#1890ff",
      textCount: count.countUsers
    }, {
      name: "הכנסות ",
      backgroundColor: "#52c41a",
      textCount: count.totalAmount + "₪"
    }, {
      name: "תרומות",
      backgroundColor: "#faad14",
      textCount: count.countPurchases
    }, {
      name: "סניפים",
      backgroundColor: "#eb2f96",
      textCount: count.countBranch
    },
  ]

  return (
    <Box  component="main"
    sx={styleRes}>

      <Layout className='py-3' >
        {/* <Header >
        <div className="logo" />
      </Header> */}
        <Content className='py-3' style={{ padding: '0 50px' }}>
          <div className="">
            <Toolbar />
            {count.countUsers ?
              <Row gutter={[16, 16]}>
                {dataDashboard.map((data, i) => (
                  <Col xs={24} sm={12} md={6}>
                    <Card title={data.name} bordered={false} style={{ backgroundColor: data.backgroundColor, color: '#fff' }}>
                      <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>{data.textCount}</h1>
                    </Card>
                  </Col>
                ))}
              </Row>
              :
              <div className='d-flex'>
                {array.map(() => (
                  <Skeleton className='me-2' active />
                ))}
              </div>
            }
          </div>
        </Content>
      <Footer style={{ textAlign: 'center' }}>מערכת ניהול סניפים ותרומות שערי ציון</Footer>
      </Layout>
    </Box>
  );
};

export default Dashboard;
// import React from 'react';
// import { Card, Row, Col } from 'antd';


// const data = {
//   users: 1000,
//   income: 25000,
//   transactions: 500,
//   branches: 5,
// };

// const Dashboard = () => {
//   const getTotalPercentage = (value) => `${(value / 1000) * 100}%`;

//   return (
//     <div className="dashboard">
//       <Row gutter={[16, 16]}>
//         <Col span={6}>
//           <Card title="Users" style={{ background: '#f39c12', textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.users}</p>
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card title="Income" style={{ background: '#27ae60', textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{`$${data.income}`}</p>
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card title="Transactions" style={{ background: '#2980b9', textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.transactions}</p>
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card title="Branches" style={{ background: '#e74c3c', textAlign: 'center' }}>
//             <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.branches}</p>
//           </Card>
//         </Col>
//       </Row>
//       <div className="bunt-cake">
//         <div
//           className="cake-segment"
//           style={{ backgroundColor: '#f39c12', width: getTotalPercentage(data.users) }}
//         ></div>
//         <div
//           className="cake-segment"
//           style={{ backgroundColor: '#27ae60', width: getTotalPercentage(data.income) }}
//         ></div>
//         <div
//           className="cake-segment"
//           style={{ backgroundColor: '#2980b9', width: getTotalPercentage(data.transactions) }}
//         ></div>
//         <div
//           className="cake-segment"
//           style={{ backgroundColor: '#e74c3c', width: getTotalPercentage(data.branches) }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







