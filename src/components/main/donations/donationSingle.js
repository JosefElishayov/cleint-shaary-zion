import React, { useContext, useEffect, useRef, useState } from 'react'
import { API_URL, doApiGet } from '../../../services/apiService'
import './donation.css';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Toolbar, Typography } from '@mui/material';
import { backgroundBody, backgroundPage, center, textColor } from '../branches/styleMuiBranch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ConnectUser from './conectUser';
import { MyContext } from '../../../context/myContext';
import { useLocation, useParams } from 'react-router-dom';
import PayForm from './payForm';
function DonationSingle() {
    const { token, donationConnect, } = useContext(MyContext);
    const params = useParams();
    const [info, setInfo] = useState({})
    const [msgVal, setMsgVal] = useState("")
    const [priceVal, setPriceVal] = useState(0)
    const [isConnect, setIsConnect] = useState(true)
    const [isPay, setIsPay] = useState(false)
    const inputRef = useRef(null)
    const numberRef = useRef()
    useEffect(() => {
        if (donationConnect)
            window.location.reload()
        doApiInit()
        AOS.init();
        AOS.refresh();
    }, [])
    const doApiInit = async () => {
        try {
            const url = API_URL + "/donations/single/" + params["id"];
            const data = await doApiGet(url);
            setInfo(data)
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    const styleMainImg = {
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "620px",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    }
    return (
        <div style={{ background: backgroundBody }} className='container-fluid p-0 '>
            {!token.role &&
                <ConnectUser isConnect={isConnect} setIsConnect={setIsConnect} />
            }
            <PayForm msgVal={msgVal} priceVal={priceVal} isPay={isPay} setIsPay={setIsPay} name={info.donations_Name}/>
            {info.donations_Name &&
                <>
                    <div className='p-0  '>
                        <Grid container spacing={0} justifyContent="space-between">
                            <Grid item xs={12} sm={6}>
                                <div style={{ ...styleMainImg, backgroundImage: `url(${info.img_url})`, color: "black" }}>
                                    <Typography className='p-2 imgHeader' sx={{  borderRadius: "5%", background: "rgba(246, 240, 240, 0.481)" }} fontSize="3em" variant='h1'>{info.donations_Name} </Typography>
                                </div>
                            </Grid>
                            <Grid className='my-5 mt-sm-0' sx={center} item xs={12} sm={6} >

                                <Card className='w-75 mt-md-5' data-aos="fade-left" >
                                    <CardContent >
                                        <div className='mx-md-5' style={{ textAlign: "center", color: backgroundPage }}>
                                            <div className='my-3' style={{}}>
                                                <Typography variant='h5'>  תרומה עבור {info.donations_Name}</Typography>
                                            </div>
                                            <div >
                                                <Typography variant='h6'>{info.info}</Typography>
                                            </div>
                                        </div>
                                        <CardActions>
                                            <div className='mx-md-5 mt-2 text-center'>
                                                <TextField
                                                    className='my-5'
                                                    id="outlined-number"
                                                    label="בחר סכום"
                                                    defaultValue={info.price}
                                                    inputRef={numberRef}
                                                    type="number"
                                                />
                                                <Typography variant='body1'>אנא מלאו כאן שם לתפילה להצלחה לרפואה אם זה לעילוי נשמת אנא מלאו גם את תאריך הפטירה העברי</Typography>
                                                <form className='my-3' style={{ textAlign: "center" }}>
                                                    <textarea rows={3} className='form-control ' ref={inputRef}></textarea>
                                                    <Button className='my-3' onClick={() => {
                                                        setMsgVal(inputRef.current.value);
                                                        setPriceVal(numberRef.current.value);
                                                        setIsPay(true)
                                                    }}
                                                        variant='contained'>אישור והמשך</Button>
                                                </form>
                                            </div>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </>
            }
        </div>
    )
}

export default DonationSingle