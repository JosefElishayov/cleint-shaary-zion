import { useNavigate } from 'react-router-dom';
import { Pagination, Button, Popconfirm, message, Skeleton } from "antd";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { Container } from '@mui/system';
import { Box, Dialog, DialogContent, Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyContext } from '../../../context/myContext';
import { styleRes } from '../headerAdmin/styleMui';
import AddDonations from './addDonations';
import Copyright from '../headerAdmin/CopRight';
export default function DonationsList() {
    const [imageLight, setImageLight] = React.useState(false)
    const { setIsAddDonations, setAlertMsg } = React.useContext(MyContext);
    const [ar, setAr] = React.useState([])
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [search, setSearch] = React.useState('')
    const [current, setCurrent] = React.useState(1);
    const [page, setPage] = React.useState(0);
    const nav = useNavigate();
    React.useEffect(() => {
        doApi()
        doApi()
        doApiCount()
    }, [current])
    React.useEffect(() => {
        if (search.length === 0 || search.length > 2) doApiSearch();
    }, [search])
    const doApi = async () => {
        const url = API_URL + `/donations?page=${current}`;
        try {
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiCount = async () => {
        const url = API_URL + `/donations/count`;
        try {
            const data = await doApiGet(url);
            setPage(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiSearch = async () => {
        const url = API_URL + `/donations?s=${search}`;
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
        try {
            const url = API_URL + "/donations/" + _idDel;
            const data = await doApiMethod(url, "DELETE");
            if (data.deletedCount) {
                doApi();
            }
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
    const confirm = (e) => {
        deleteBranch(e)
        setAlertMsg((prevPerson) => ({ ...prevPerson, msg: ' דף התרומה נמחק', isWorker: true, status: "success" }));
    };
    const cancel = (e) => {
        setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'לא נמחק ', isWorker: true, status: "error" }));
    };
    return (
        <Box
            component="main"
            sx={styleRes}
        >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                <Toolbar />
                <AddDonations />
                <div className='d-sm-flex justify-content-between mt-3 mb-2'>
                    <Button
                    className='mb-3 mb-sm-0'
                        color='primary'
                        variant="contained"
                        onClick={() => { setIsAddDonations(true) }}
                    >
                        הקמת תרומה
                    </Button>
                    <input placeholder="חיפוש כללי..." className='form-check' type="text" onChange={(e) => setSearch(e.target.value)} />
                </div>
                {ar[0] ?
        
                        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                            <TableContainer sx={{ maxHeight: 440 }} >
                                <Table stickyHeader aria-label="sticky table" className='table'>
                                    <TableHead sx={{ position: "sticky" }}>
                                        <TableRow >
                                            <th >#</th>
                                            <th >שם התרומה</th>
                                            <th>מחיר</th>
                                            <th>מידע</th>
                                            <th>תאריך יצירה</th>
                                            <th>תמונה</th>
                                            <th >ערוך/מחק</th>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {ar.map((row, i) => {
                                            const page = current || 0;
                                            return (
                                                <>
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>

                                                        <td> {((page - 1) * 10) + i + 1}</td>
                                                        <td> {row.donations_Name}</td>
                                                        <td> {row.price}</td>
                                                        <td> {row.info.substring(0, 10)}...</td>
                                                        <td> {row.date_Created.substring(0, 10)}</td>
                                                        <td> <Button onClick={() => {
                                                            handleRowClick(row._id)
                                                            setImageLight(true)
                                                        }}> +</Button>
                                                            {selectedRow === row._id && (
                                                                <Dialog open={imageLight} onClose={() => { setImageLight(false) }} maxWidth="md" >
                                                                    <DialogContent>
                                                                        <img src={row.img_url} alt="jj" width={450} height={350} />
                                                                    </DialogContent>
                                                                </Dialog>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <Button onClick={() => { nav('/admin/donations/edit/' + row._id) }}>
                                                                <EditIcon />
                                                            </Button>
                                                            <Popconfirm
                                                                title="מחיקת דף התרומה"
                                                                description="האם אתה בטוח שברצונך למחוק?"
                                                                onConfirm={() => confirm(row._id)}
                                                                onCancel={cancel}
                                                                okText="כן"
                                                                cancelText="לא"
                                                            >
                                                                <Button danger><DeleteIcon /></Button>
                                                            </Popconfirm>
                                                        </td>
                                                    </TableRow>
                                                </>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Pagination style={{ textAlign: "center", padding: "16px" }} current={current} onChange={onChange} total={page.count} />
                        </Paper>: <div>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                   
            }
            </Container>
            <Copyright/>
        </Box >
    );
}
