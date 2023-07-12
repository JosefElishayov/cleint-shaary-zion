import { useNavigate } from 'react-router-dom';
import { Pagination } from "antd";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { Container } from '@mui/system';
import { Box, Button,  Toolbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyContext } from '../../../context/myContext';
import AddBranch from './addBranch';
import { styleRes } from '../headerAdmin/styleMui';
export default function BranchAdminList() {
  const { setIsAddBranch,setAlertMsg } = React.useContext(MyContext);
  const [ar, setAr] = React.useState([])
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
    const url = API_URL + `/branches?page=${current}`;
    try {
      const data = await doApiGet(url);
      setAr(data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const doApiCount = async () => {
    const url = API_URL + `/branches/count`;
    try {
      const data = await doApiGet(url);
      setPage(data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const doApiSearch = async () => {
    const url = API_URL + `/branches?s=${search}`;
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
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הסניף")) {
      try {
        const url = API_URL + "/branches/" + _idDel;
        const data = await doApiMethod(url, "DELETE");
        if (data.deletedCount) {
          doApi();
          setAlertMsg((prevPerson) => ({ ...prevPerson, msg: 'הסניף נמחק בהצלחה',isWorker:true , status: "success"}));
        }
      }
      catch (err) {
        console.log(err);
        alert("לא נמחק")
      }
    }
  }
  return (
    <Box
      component="main"
      sx={styleRes}
    >
      <AddBranch />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}>
          <Button
            color='primary'
            variant="contained"
            onClick={() => { setIsAddBranch(true) }}
          >
            הוספת סניף
          </Button>
          <input placeholder="חיפוש כללי..." className='form-check' type="text" onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
          <TableContainer sx={{ maxHeight: 440 }} >
            <Table stickyHeader aria-label="sticky table" className='table'>
              <TableHead sx={{ position: "sticky" }}>
                <TableRow >
                  <th >#</th>
                  <th >שם הסניף</th>
                  <th>כתובת</th>
                  <th>רב הסניף</th>
                  <th>אודות הסניף</th>
                  <th> חדשות</th>
                  <th>מספר הטלפון</th>
                  <th >ערוך</th>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {ar.map((row, i) => {
                    const page = current ||0;
                    return ( 
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
              
                        <td> {((page-1) * 10) + i+1}</td>
                        <td> {row.brunch_name}</td>
                        <td> {row.address}</td>
                        <td> {row.manager}</td>
                        <td> {row.description}</td>
                 
                        <td>{row.news[2]}..</td>
                      
                        <td> {row.phone}</td>
                        <td>
                          <Button  size="small" 
                            color='inherit' variant="contained" onClick={() => {
                              nav('/admin/branch/edit/' + row._id);
                            }
                            }>
                            <EditIcon fontSize='small'/>
                          </Button>
                          <Button  size="small" 
                            color='error' variant="contained" onClick={() => {
                              deleteBranch(row._id)
                            }
                            }>
                            <DeleteIcon fontSize='small'/>
                          </Button>
                        </td>
                   
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>         
          <Pagination   style={{textAlign:"center",padding:"16px"}}  current={current} onChange={onChange}  total={page.count} />
        </Paper>
      </Container>
      </Box >
      );
}