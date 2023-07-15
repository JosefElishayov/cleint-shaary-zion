import React, { useEffect, useRef, useState } from 'react'
import { API_URL, apiGet } from '../../../services/apiService'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GoogleMapReact from 'google-map-react';
import { Box, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import './branch.css';
import { backgroundBody, backgroundPage, boxAboutStyle, center, textColor } from './styleMuiBranch';
import { useParams } from 'react-router-dom';
import { Card, Carousel } from 'antd';
function BranchPublic() {
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const [loadMoreImage, setLoadMoreImage] = useState("טען עוד")
    const [visible, setVisible] = useState(3)
    const [info, setInfo] = useState({})
    const [arr, setArr] = useState([])
    const [postAr, setPostAr] = useState([])
    const [index, setIndex] = useState(0);
    const [data, setData] = useState({ img: "", i: 0 })
    const params = useParams();
    const [imgModal, setImgModal] = useState(false)
    const isBelowThreshold = window.innerWidth < 768;
    useEffect(() => {
        doApiBranch()

    }, [])
    const doApiBranch = async () => {
        // setIsLoading(true);
        const url = API_URL + "/branches/single/" + params["id"];


        const data = await apiGet(url);
        // setIsLoading(false);
        setInfo((data));
        if (index === 0) {
            setPostAr(data.news);
            setArr(data.images)
            setIndex(+1)
        }
    };
    const viewImage = (img, i) => {
        setData({ img, i })
        if(!isBelowThreshold)
        setImgModal(true)
    }
    const imgAction = (action) => {
        let i = data.i;
        if (action === "next") {
            setData({ img: arr[i + 1], i: i + 1 })
        }
        if (action === "previous") {
            setData({ img: arr[i - 1], i: i - 1 })
        }
        if (!action) {
            setData({ img: "", i: 0 })
        }
    }
    const showMoreImage = () => {
        if (visible <= arr.length) {
            setVisible((prevValue) => prevValue + 3)
        } else {
            setLoadMoreImage("אין יותר תמונות")
        }
    }
    const handleWazeNavigation = () => {
        const address = encodeURIComponent(info.address);
        window.open(`https://waze.com/ul?q=${address}`);
    };
    const MapComponent = () => {
        const defaultProps = {
            center: {
                lat: info.map.wid,
                lng: info.map.len,
            },
            zoom: 17,
        };
        return (
            <div style={{ height: '250px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent lat={36.955413} lng={39.337844} text="My Marker" />
                </GoogleMapReact>
            </div>
        );

    };
    const carouselRef = useRef(null);
    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleNext = () => {
        carouselRef.current.next();
    };
    return (
        <div className='container-fluid p-0  '>
            {info.brunch_name &&
                <>
                    {data.img &&
                        <Dialog className='d-none d-sm-block' open={imgModal} onClose={() => { setImgModal(false) }} maxWidth="md" fullWidth >
                            <DialogContent>

                                <img
                                    src={data.img}
                                    style={{ width: "100%", display: "block" }}
                                    alt=""
                                    width={200}
                                    height={500}
                                />
                                <div className='text-center mt-2 '>
                                    <Button className='ms-1' variant='contained' onClick={() => imgAction("previous")}><ArrowForwardIosIcon /></Button>
                                    <Button variant='contained' onClick={() => imgAction("next")}> <ArrowBackIosNewIcon /></Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    }
                    <div className='' style={{ backgroundImage: `url(${info.imgHeder})`, height: "500px", backgroundPosition: "center", backgroundSize: "cover" }}>
                        <div style={{ height: "100%" }} className='backLinear d-flex align-items-center' >
                            <div className='container text-light  me-5 '>
                                <h1 className='display-1 '>
                                    {info.brunch_name}
                                </h1>
                                <h3 className='display-4 '>{info.description}</h3>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-up"
                        data-aos-duration="3000" className='container mt-5 center' style={{ height: "300px" }}>
                        <h5 className=' display-6'>
                            {info.info}
                        </h5>
                    </div>
                    <div className='mx-md-5 mx-3 mt-3'>

                        <Grid sx={{mb:5}} container spacing={2} justifyContent="center">
                            {info.news[2] &&
                                <Grid item xs={12} sm={7}>
                                    <div >
                                        <h2 className='text-center display-3 '>עדכונים אחרונים</h2>
                                        <Carousel
                                            ref={carouselRef}
                                            autoplay
                                            vertical
                                            slidesToShow={3}
                                            slidesToScroll={1}

                                        >
                                            {info.news.map((update, index) => (
                                                <div key={index}>
                                                    <Card style={{ background: backgroundBody }}>
                                                        <p>{update}</p>
                                                    </Card>
                                                </div>
                                            ))}
                                        </Carousel>
                                        <div style={{ textAlign: "center", marginTop: "16px" }}>
                                            <Button sx={{ background: backgroundPage, marginX: "8px" }} variant='contained' onClick={handlePrev} >
                                                קודם
                                            </Button>
                                            <Button sx={{ background: backgroundPage }} variant='contained' onClick={handleNext}>הבא</Button>
                                        </div>
                                    </div>
                                </Grid>
                            }
                            <Grid item xs={12} sm={12}>
                                <div className='mt-3' style={{ textAlign: "center", color: textColor }}>
                                    <ResponsiveMasonry >
                                        <h3 className='display-3 py-4'>גלריה</h3>
                                        <Masonry gutter='18px'>
                                            {arr.slice(0, visible).map((image, i) => (
                                                <img
                                                    key={i}
                                                    src={image}
                                                    style={{ width: "100%", display: "block" }}
                                                    alt=""
                                                    onClick={() => viewImage(image, i)}
                                                    width={100}
                                                    height={300}
                                                />
                                            ))}
                                        </Masonry>
                                    </ResponsiveMasonry >
                                    <button className='btn' style={{ margin: "8px", background: backgroundPage, color: textColor }} onClick={showMoreImage}>{loadMoreImage}</button>
                                </div>
                            </Grid>
                            <Grid  item xs={12} sm={6}>
                                <div style={boxAboutStyle}>
                                    <h2 className='display-6' style={{ textAlign: "center" }}>פרטים וצור קשר</h2>
                                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                                        <p>
                                            <strong>אימייל:</strong><br />
                                            <a href={`mailto:${info.email}`} >
                                                {info.email}
                                            </a>
                                        </p>
                                        <p>
                                            <strong>טלפון:</strong> <br />
                                            <a href={`tel:${info.phone}`}>
                                                {info.phone}
                                            </a>
                                        </p>
                                        <p>
                                            <strong>כתובת </strong> <br />{info.address}
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid  item xs={12} sm={6}>
                                <div style={{ border: "solid", background: backgroundPage, textAlign: "center", height: "300px" }}>
                                    <MapComponent />
                                    <button className='btn m-2' style={{ background: backgroundBody }} onClick={handleWazeNavigation}>לחץ לניווט</button>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                </>
            }
        </div>
    )
}
export default BranchPublic