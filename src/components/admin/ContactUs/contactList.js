import { useNavigate } from 'react-router-dom';
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
import { styleRes } from '../headerAdmin/styleMui';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
export default function ContactList() {
    const [ar, setAr] = React.useState([])
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [search, setSearch] = React.useState('')
    const [current, setCurrent] = React.useState(1);
    const [page, setPage] = React.useState(0);
    React.useEffect(() => {
        doApi()
        doApi()
        doApiCount()
    }, [current])
    React.useEffect(() => {
        if (search.length === 0 || search.length > 2) doApiSearch();
    }, [search])
    const doApi = async () => {
        const url = API_URL + `/contact?page=${current}`;
        try {
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiCount = async () => {
        const url = API_URL + `/contact/count`;
        try {
            const data = await doApiGet(url);
            setPage(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiSearch = async () => {
        const url = API_URL + `/contact?s=${search}`;
        try {
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const onChange = (page) => {
        setCurrent(page);
    };
    const deleteBranch = async (_idDel) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את ההודעה")) {
            try {
                const url = API_URL + "/contact/" + _idDel;
                const data = await doApiMethod(url, "DELETE");
                if (data.deletedCount) {
                    doApi();
                    alert(" נמחק");
                }
            }
            catch (err) {
                console.log(err);
                alert("לא נמחק")
            }
        }
    }
    const handleRowClick = (id) => {
        if (selectedRow === id) {
            setSelectedRow(null);
        } else {
            setSelectedRow(id);
        }
    };
    const changeStatus = async (_contactItem) => {
        const newStatus = _contactItem.status === "בטיפול" ? "טופל" : "בטיפול";
        const url = `${API_URL}/contact/changeStatus/${_contactItem._id}/${newStatus}`;
        try {
          const data = await doApiMethod(url, "PATCH");        
          if (data.modifiedCount) {
            doApi();
          }
        }
        catch (error) {
          console.log(error);
          alert("There problem, try again later")
        }
      }
    return (
        <Box
            component="main"  sx={styleRes}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                <Toolbar />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
                    <input placeholder="חיפוש כללי..." className='form-check' type="text" onChange={(e) => setSearch(e.target.value)} />
                </Box>
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="sticky table" className='table'>
                            <TableHead sx={{ position: "sticky" }}>
                                <TableRow >
                                    <th >פתח</th>
                                    <th >#</th>
                                    <th>תאריך שליחה</th>
                                    <th >שם השולח</th>
                                    <th>טלפון</th>
                                    <th>אימייל</th>
                                    <th>סטטוס</th>
                                    <th>הודעה</th>
                                    <th >מחק</th>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ar.map((row, i) => {
                                    const page = current || 0;
                                    return (
                                        <React.Fragment key={row._id}>
                                        <TableRow sx={{background: row.status === "בטיפול" ? "'white'" : "gray" }}  hover role="checkbox" tabIndex={-1} >
                                            <td><button className='badge text-black'
                                            onClick={() => handleRowClick(row._id)}
                                            >+</button></td>
                                            <td> {((page - 1) * 10) + i + 1}</td>
                                            <td> {row.date_created.substring(0, 10)}</td>
                                            <td> {row.name}</td>
                                            <td> {row.phone}</td>
                                            <td> {row.email}</td>
                                            <td> <button className='badge' style={{ background: row.status === "בטיפול" ? "red" : "greenyellow" }} onDoubleClick={() => { changeStatus(row) }}>{row.status}</button></td>
                                            <td> {row.message.substring(0, 10)}...</td>
                                            <td>
                                                <Button
                                                size="small"    color='error' variant="contained" onClick={() => {deleteBranch(row._id)}}>        
                                                    <DeleteIcon fontSize="small"/>
                                                </Button>
                                            </td>
                                            </TableRow>
                                            {selectedRow === row._id && (
                                                <tr>
                                                <td colSpan={12}>
                                                    <h5><strong>תוכן הבקשה</strong></h5>                                  
                                                  <p> {row.message}</p>
                                                </td>
                                              </tr>
                                            )}
                                           </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination style={{ textAlign: "center", padding: "16px" }} current={current} onChange={onChange} total={page.count} />
                </Paper>
            </Container>
        </Box >
    );
}
