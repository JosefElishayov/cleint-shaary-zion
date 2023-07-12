import React, { useContext, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import LockOutlinedIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import AOS from 'aos';
import Burger from './burger';
import Login from '../login&signup/login';
import { linksObj } from './data/objectForHeader';
import { MyContext } from '../../../context/myContext';
import { backgroundPage } from '../branches/styleMuiBranch';
import ThemeProvider1 from '../../../mui';
export default function Nav() {
    const inputSearch = useRef()
    const nav = useNavigate()
    const [openSearch, setOpenSearch] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const { token } = useContext(MyContext);
    const location = useLocation()

    // const logo = "https://images.squarespace-cdn.com/content/v1/56962bdcd8af10829fde684a/1492038591117-7F28J09AGCOHY8IHL83E/Chabad+Logo+-+Vertical+-+Color?format=50w"
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset;
            const shouldFixNavigation = scrollPosition > 50;
            setIsFixed(shouldFixNavigation);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    const reload = () => {
        if (isFixed) {
            window.location.reload("/")
        }
    }
    const reloadLocation = () => {
        if (location.pathname !== "/")
            window.location.reload()
        // window.scroll(1000, 1000)
    }
    return (
        <div>
            <div className='d-none d-md-block bg-body text-center'>
                {/* <img alt='logo' src={logo} /> */}
                <a href='/'> <img alt='logo' src="/images/logo.png" height="100px" /></a>
            </div>
            <header style={{ position: "fixed", zIndex: 999, top: (isFixed) ? 0 : "", background: (isFixed) ? "aliceblue" : "#1f236263", color: (!isFixed) ? backgroundPage : "" }} className='container-fluid text-center  '>
                <div className='d-none d-md-block'>
                    <nav className={!isFixed ? "text-light d-flex justify-content-between" : "d-flex justify-content-between"}>
                        <ul className='d-sm-flex  m-0 ' style={{ listStyle: "none" }}>
                            {linksObj.map((item) => (
                                <li onClick={reload}><Link to={item.link} style={{ color: (!isFixed) ? "white" : "black" }} className="listLink">{item.name}</Link></li>
                            ))}
                            <li onClick={reloadLocation}><NavLink to={location.pathname !== "/" ? "/" : ""} onClick={() => { window.scroll(1000, 1000) }} style={{ color: (!isFixed) ? "white" : "black" }} className="listLink"> תרומות</NavLink></li>
                            <li onClick={reloadLocation}><Link to={location.pathname !== "/" ? "/" : ""} onClick={() => window.scroll(2000, 2000)} style={{ color: (!isFixed) ? "white" : "black" }} className="listLink"> צור קשר</Link></li>
                            {token.role &&
                                <li><Link to="/myAccount" style={{ color: (!isFixed) ? "white" : "black" }} className="listLink">החשבון שלי</Link></li>
                            }
                        </ul>
                        <ul className='d-flex justify-content-between m-0 p-0' style={{ listStyle: "none", textAlign: "left" }}>
                            {!openSearch &&
                                <li className='mt-1'>
                                    <Button onClick={() => { setOpenSearch(true) }} style={{ color: (!isFixed) ? "white" : "black" }} size='lg' variant='outline'><SearchIcon /></Button>
                                </li>
                            }
                            {!openLogin &&
                                <li className='mt-1'>
                                    <Button onClick={() => { setOpenLogin(true) }} style={{ color: (!isFixed) ? "white" : "black" }} size='lg' variant='outline'>  <LockOutlinedIcon /></Button>
                                </li>
                            }
                        </ul>
                        {openSearch &&
                            <div data-aos="fade-right" className='text-center bg-emphasis  p-2' style={{ position: "absolute", left: 100 }}>
                                <div className="d-flex  ">
                                    <Form.Control
                                        type="search"
                                        placeholder="חיפוש"
                                        className="mx-2  "
                                        aria-label="Search"
                                        ref={inputSearch}
                                        size='sm'
                                    />
                                    <Button type='button'
                                        onClick={() => { nav("/search/" + inputSearch.current.value); window.location.reload() }}
                                        variant="outline-success"><SearchIcon fontSize='medium' /></Button>
                                </div>
                            </div>
                        }
                        {openLogin &&
                            <div data-aos="fade-down"
                                data-aos-duration="1500" style={{ position: "absolute", left: 10, top: 30, width: "300px", height: "" }}><Login/></div>
                        }
                    </nav>
                </div>
                <div className='d-md-none '>
                    <Burger location={location} reload={reload} reloadLocation={reloadLocation}/>
                </div>
            </header>
        </div>
    )
}
