import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import { Container, Toolbar } from "@mui/material";
import MyAccount from "./myAccount";
import HistoryUser from "./historyUser";
import { API_URL, KEY_TOKEN, doApiGet } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import EditBranch from "../admin/branchAdmin/editBranch";
import { Button } from "antd";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function AppUser() {

    const [info, setInfo] = React.useState({});
    const [branchList, setBranchList] = React.useState([])
    const [entryEdit,serEntryEdit]=React.useState('')
    const nav=useNavigate()
    React.useEffect(() => {
        doApi();
    }, [])

    React.useEffect(() => {
            doApiBranch()      
    }, [])
    const doApi = async () => {
        let url = API_URL + `/users/userInfo`
        try {
            const data = await doApiGet(url);
            setInfo(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const doApiBranch = async () => {
        const url = API_URL + `/branches/all`;
        try {
            const data = await doApiGet(url);
            setBranchList(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const [
        value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const checkUserIfEdit = () => {
        for (let i=0;i<branchList.length;i++){         
            if (branchList[i].brunch_name===info.editBranch){ 
                serEntryEdit(branchList[i]._id)   
            }             
        }
    }
    const logOut = () => {
        localStorage.removeItem(KEY_TOKEN)
        nav("/")
        window.location.reload()
      }
    return (
        <div className="container-fluid" style={{ background: "rgb(247, 242, 228)" }}>
            <Container className="center" sx={{ background: "rgb(247, 242, 228)" }}>           
                <Box sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "128px" }}>
                <Button onClick={logOut}>התנתק</Button>
                
                    <Tabs
                        sx={{ textAlign: "center" }}
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="פרטי חשבון" {...a11yProps(0)} />
                        <Tab label="היסטוריית תרומות" {...a11yProps(1)} />
                        {info.editBranch !== "לא עורך" &&
                            <Tab onClick={checkUserIfEdit} label="ערוך סניף" {...a11yProps(2)} />
                        }
                     
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <MyAccount info={info} doApi={doApi} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    < HistoryUser />
                </TabPanel>
                {info.editBranch !== "לא עורך" &&
                    <TabPanel value={value} index={2}>
                       <EditBranch itemId={entryEdit}/>
                       {console.log(entryEdit)
                       }
                    </TabPanel>
                }
            </Container>
        </div>
    );
}
