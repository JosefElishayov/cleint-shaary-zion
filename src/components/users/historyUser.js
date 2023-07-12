import { Pagination } from "antd";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/system';
import { Box, Button, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyContext } from '../../context/myContext';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
export default function HistoryUser() {
    const [ar, setAr] = React.useState([])
    const [selectedRow, setSelectedRow] = React.useState(null);
    const { token } = React.useContext(MyContext);
    React.useEffect(() => {
        doApi()
        doApi()
       
    }, )
    const doApi = async () => {
        const url = API_URL + `/purchase?user_id=${token._id}`;
        try {
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleRowClick = (id) => {
        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(id);
        }
    };
    return (
        <Box >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                <Toolbar />
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="sticky table" className='table'>
                            <TableHead sx={{ position: "sticky" }}>
                                <TableRow >
                                    <th >פתח</th>
                                    <th >#</th>
                                    <th>תאריך רכישה</th>
                                    <th>סכום </th>
                                    <th>קוד תשלום</th>
                                    <th>הודעה</th>
                                 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ar.map((row, i) => {
                                    return (
                                        
                                        <React.Fragment key={row._id}>
                                        {row.status==="שולם"&&
                                            <>
                                        <TableRow hover role="checkbox" tabIndex={-1} >
                                            <td><button className='badge text-black'
                                            onClick={() => handleRowClick(row._id)}
                                            >+</button></td>
                                            <td> { i + 1}</td>
                                            <td> {row.date_create.substring(0,10)}</td>
                                            <td> {row.price}</td>
                                            <td>{row.token_id}</td>
                                            <td> {row.comments.substring(0,10)}...</td>
                                           
                                            </TableRow>
                                            {selectedRow === row._id && (
                                                <tr>
                                                <td colSpan={12}>
                                                    <h5><strong>תוכן הבקשה</strong></h5>                                  
                                                  <p> {row.comments}</p>
                                                </td>
                                              </tr>
                                            )}
                                            </>
                                        }
                                           </React.Fragment>
                                       
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                  
                </Paper>
            </Container>
        </Box >
    );
}
