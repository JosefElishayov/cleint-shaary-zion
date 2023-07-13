import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService';
import { Container } from '@mui/system';
import { Box, Toolbar } from '@mui/material';
import { Pagination, Select, Skeleton, Space } from 'antd';
import { MyContext } from '../../../context/myContext';
export default function UserList() {
  const [search, setSearch] = React.useState('')
  const [current, setCurrent] = React.useState(1);
  const [ar, setAr] = React.useState([])
  const [arBranch, setArBranch] = React.useState([])
  const [selectVal, SetSelectVal] = React.useState("")
  console.log(selectVal);
  const nav = useNavigate();
  const [page, setPage] = React.useState(0);
  const { setAlertMsg } = React.useContext(MyContext);
  React.useEffect(() => {
    doApi();
    doApi()
    doApiCount()
    doApiBranches()
  }, [current])
  React.useEffect(() => {
    if (search.length === 0 || search.length > 2) doApiSearch();
  }, [search])
  const doApi = async () => {
    const url = API_URL + `/users/usersList?page=${current}`;
    try {
      const data = await doApiGet(url);
      setAr(data);
      console.log(data);

    }
    catch (err) {
      console.log(err);
    }
  }
  const doApiSearch = async () => {
    const url = API_URL + `/users/usersList?s=${search}`;
    try {
      const data = await doApiGet(url);
      setAr(data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const doApiBranches = async () => {
    const url = API_URL + `/branches/all`;
    try {
      const data = await doApiGet(url);
      setArBranch(data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const changeRole = async (_userItem) => {
    const newRole = _userItem.role === "admin" ? "user" : "admin";
    const url = `${API_URL}/users/changeRole/${_userItem._id}/${newRole}`;
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
  const changeEditBranch = async (event) => {
    const url = `${API_URL}/users/changeEdit/${selectVal}/${event}`;
    try {
      const data = await doApiMethod(url, "PATCH");
      if (data.modifiedCount) {
        doApi();
        setAlertMsg((prevPerson) => ({ ...prevPerson, msg: ' עורך סניף עודכן בהצלחה', isWorker: true, status: "success" }));
      }
    }
    catch (error) {
      console.log(error);
      // alert("There problem, try again later")
    }
  }
  const doApiCount = async () => {
    const url = API_URL + `/users/count`;
    try {
      const data = await doApiGet(url);
      setPage(data);
    }
    catch (err) {
      console.log(err);
    }
  }
  const onChange = (page) => {
    setCurrent(page);
  };

  return (
    <Box sx={{
      background: "rgb(245, 245, 245);", flexGrow: 1,
      height: '100vh',
    }}>
      <Container  >
        <Toolbar />
        <Box sx={{ display: "flex", mt: 3, mb: 2 }}>
          <input placeholder="חיפוש כללי..." className='form-check' type="text" onChange={(e) => setSearch(e.target.value)} />
        </Box>
        {ar[0] ?
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
          <TableContainer sx={{ maxHeight: 440 }} >
            <Table stickyHeader aria-label="sticky table" className='table'>
              <TableHead >
                <TableRow >
                  <th >#</th>
                  <th >שם משתמש</th>
                  <th>אימייל</th>
                  <th>כתובת</th>
                  <th>טלפון</th>
                  <th>תפקיד</th>
                  <th>שיוך לסניף</th>
                  <th>תאריך יצירה</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {ar
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    const page = current || 0;
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                        <td> {((page - 1) * 10) + i + 1}</td>
                        <td> {row.name}</td>
                        <td> {row.email}</td>
                        <td> {row.address}</td>
                        <td> {row.phone}</td>
                        <td><button className='badge' style={{ background: row.role === "admin" ? "greenyellow" : "silver", border: "none" }} onDoubleClick={() => { changeRole(row) }}>{row.role}</button></td>
                        <td>
                          <Space wrap>
                            <Select
                              defaultValue={row.editBranch}
                              style={{ width: 120 }}
                              onChange={changeEditBranch}
                              onClick={() => { SetSelectVal(row._id) }}
                              options={arBranch.map((province, index) => ({
                                label: province.brunch_name,
                                value: province.brunch_name,
                                key: `option_${index}`,
                              }))}
                            />
                          </Space>
                        </td>
                        <td> {row.date_created.substring(0, 10)}</td>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination style={{ textAlign: "center", padding: "16px" }} current={current} onChange={onChange} total={page.count} />
        </Paper>:
        <div>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
        }
      </Container>
    </Box>
  );
}
