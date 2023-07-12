import { Container, Grid, ListItemButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL, apiGet } from '../../../services/apiService';
import './branch.css';
import { backgroundPage, textColor } from './styleMuiBranch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
export default function BranchUserList() {
    const [branchList, setBranchList] = useState([])
    const location = useLocation();
    const [listFourBranches, setListFourBranches] = useState(location.pathname)
    const [visible, setVisible] = useState(0)
    const isBelowThreshold = window.innerWidth < 768;
    const nav = useNavigate()
    useEffect(() => {
        doApi()
    }, [])
    useEffect(() => {
        if (listFourBranches !== "/branches") {
            if (!isBelowThreshold)
                setVisible(3)
            else {
                setVisible(1)
            }
        } else {
            setVisible(branchList.length)
        }

    }, [branchList])
    const doApi = async () => {
        // setIsLoading(true);
        const url = API_URL + `/branches/all`;
        const data = await apiGet(url);
        // setIsLoading(false);
        setBranchList((data));
    };
    const reload = () => {
        if (visible === 3) {
            window.location.reload()
        }
    }
    return (
        <div className='container-fluid  py-4' style={{}}>
            <Container>
                <h2 className='text-center fs-1'>סניפים</h2>
                <Grid container spacing={2} justifyContent="center" sx={{}}>
                    <>
                        {branchList.slice(0, visible).map((branch) => (
                            <Grid key={branch._id} item xs={12} md={4} sm={6}>
                                <ListItemButton onClick={reload} sx={{ background: backgroundPage, color: textColor }} className='p-0  shadow  '>
                                    <Link to={"/branch/" + branch._id} className='linkText '>
                                        <div className='image-container' >
                                            <img alt={branch.brunch_name} src={branch.imgHeder} />
                                        </div>
                                        <div className='text-center mt-2 '>
                                            <h3 >{branch.brunch_name}</h3>
                                            <p>{branch.description}</p>
                                        </div>
                                    </Link>
                                </ListItemButton>
                            </Grid>
                        ))}
                    </>

                </Grid>
                {visible === 3 &&
               <Button className='mt-2' onClick={reload}> <Link  to={"/branches"}> לכל הסניפים</Link> </Button>
                }
            </Container>
        </div >
    )
}
