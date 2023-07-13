import React, { useContext, useState } from 'react';
import { Drawer } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Login from '../login&signup/login';
import { MyContext } from '../../../context/myContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { KEY_TOKEN } from '../../../services/apiService';
import { linksObj } from './data/objectForHeader';
import ThemeProvider1 from '../../../mui';
const Burger = (props) => {
    const {location,reloadLocation,reload}=props
    const [open, setOpen] = useState(false);
    const { token } = useContext(MyContext);
    const nav=useNavigate()
    // const logo = "https://images.squarespace-cdn.com/content/v1/56962bdcd8af10829fde684a/1492038591117-7F28J09AGCOHY8IHL83E/Chabad+Logo+-+Vertical+-+Color?format=50w"
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const logOut = () => {
        localStorage.removeItem(KEY_TOKEN)
        window.location.reload()

      }
    return (
        <div className='p-2 m-0'>
            <div className='d-flex justify-content-between'>
                <div >
                    <Link to={"/"}><img alt='logo' src="/images/logo.png" height={50} /></Link>
                </div>

                <Button variant='outline-success' type="primary" onClick={showDrawer}>
                    <MenuOutlinedIcon />
                </Button>

            </div>
            <Drawer title="שערי ציון" placement="right" onClose={onClose} open={open}>
                <nav className='text-center '>
                    <ul className='' style={{ listStyle: "none" }}>                       
                        {linksObj.map((item,i) => (
                                <li key={i} onClick={reload}> <Link onClick={onClose} to={item.link} style={{color:"black"}} className='listLink display-6 '>{item.name}</Link></li>
                            ))}
                            <li onClick={reloadLocation}><Link to={location.pathname !== "/" ? "/" : ""} onClick={()=>{window.scroll(1000,1000);onClose()}}  style={{color:"black"}} className="listLink display-6"> תרומות</Link></li>
                            <li onClick={reloadLocation}><Link to={location.pathname !== "/" ? "/" : ""} onClick={()=>{window.scroll(2000,2000);onClose()}}  style={{color:"black"}} className="listLink display-6"> צור קשר</Link></li>
                              {token.role&&
                            <li><Link to="/myAccount" onClick={onClose} style={{color:"black"}} className='listLink fs-3 '>החשבון שלי</Link></li>
                            }
                    </ul>
                    <div className="d-flex m-2 " >
                        <Form.Control
                            type="search"
                            placeholder="חיפוש"

                            className="mx-2  "
                            // aria-label="Search"
                            //   ref={inputSearch}
                            size='sm'
                        />
                        <Button type='button'
                            // onClick={()=>{nav("/search/"+inputSearch.current.value);window.location.reload()}} 
                            variant="outline-success"><SearchIcon fontSize='medium' /></Button>
                    </div>


                </nav>
                {!token.role ?
                    <div style={{ width: "100%", height: "" }}><ThemeProvider1><Login /></ThemeProvider1></div>:
                  <div className='text-center mt-5 '> <Button  onClick={logOut}><LogoutIcon /> התנתק</Button></div>
}
            </Drawer>
        </div>
    );
};

export default Burger;