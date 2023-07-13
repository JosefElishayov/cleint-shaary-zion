import { useNavigate } from 'react-router-dom';
import { Pagination, Skeleton } from "antd";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { Container } from '@mui/system';
import { Box, Button, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styleRes } from '../headerAdmin/styleMui';
export default function PurchaseList() {
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
        const url = API_URL + `/purchase?page=${current}`;
        try {
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiCount = async () => {
        const url = API_URL + `/purchase/count`;
        try {
            const data = await doApiGet(url);
            setPage(data);
            console.log(data);

        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiSearch = async () => {
        const url = API_URL + `/purchase?s=${search}`;
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
    const deletePurchase = async (_idDel) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את הרכישה")) {
            try {
                const url = API_URL + "/purchase/" + _idDel;
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

    return (
        <Box
            component="main" sx={styleRes}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                <Toolbar />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
                    <input placeholder="חיפוש כללי..." className='form-check' type="text" onChange={(e) => setSearch(e.target.value)} />
                </Box>
                {ar[0] ?
                    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                        <TableContainer sx={{ maxHeight: 440 }} >
                            <Table stickyHeader aria-label="sticky table" className='table'>
                                <TableHead sx={{ position: "sticky" }}>
                                    <TableRow >
                                        <th >פתח</th>
                                        <th >#</th>
                                        <th>תאריך רכישה</th>
                                        <th>סכום </th>
                                        <th >שם התורם</th>
                                        <th>טלפון</th>
                                        <th>אימייל</th>
                                        <th>סטטוס</th>
                                        <th>קוד משתמש</th>
                                        <th>קוד תשלום</th>
                                        <th>הודעה</th>
                                        <th >מחק</th>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ar.map((row, i) => {
                                        const page = current || 0;
                                        return (
                                            <React.Fragment key={row._id}>
                                                <TableRow hover role="checkbox" tabIndex={-1} >
                                                    <td><button className='badge text-black'
                                                        onClick={() => handleRowClick(row._id)}
                                                    >+</button></td>
                                                    <td> {((page - 1) * 10) + i + 1}</td>
                                                    <td> {row.date_create.substring(0, 10)}</td>
                                                    <td> {row.price}</td>
                                                    <td> {row.user_name}</td>
                                                    <td> {row.phone}</td>
                                                    <td> {row.email}</td>
                                                    <td> <div className='badge' style={{ background: row.status === "לא שולם" ? "red" : "greenyellow" }}
                                                    // onDoubleClick={() => { changeStatus(row) }}596
                                                    >
                                                        {row.status}</div></td>
                                                    <td> {row.user_id}...</td>
                                                    <td> {row.token_id}</td>
                                                    <td> {row.comments.substring(0, 10)}...</td>
                                                    <td>
                                                        <Button
                                                            size="small" color='error' variant="contained" onClick={() => { deletePurchase(row._id) }}>
                                                            <DeleteIcon fontSize="small" />
                                                        </Button>
                                                    </td>
                                                </TableRow>
                                                {selectedRow === row._id && (
                                                    <tr>
                                                        <td colSpan={12}>
                                                            <h5><strong>תוכן הבקשה</strong></h5>
                                                            <p> {row.comments}</p>
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
                    </Paper> :
                    <div>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </div>
                }

            </Container>
        </Box >
    );
}
