import React, { useEffect, useState } from 'react'
import { API_URL, apiGet } from '../../../services/apiService';
import "../main.css"
import AOS from 'aos';
export default function Section() {
    const [bigBranch, setBigBranch] = useState({})
    useEffect(() => {
        doApi()
    }, [])
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    const imageMaim = "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const doApi = async () => {
        // setIsLoading(true);
        const url = API_URL + `/branches/single/644e278e055f2c5dc7d0c10c`;
        const data = await apiGet(url);
        // setIsLoading(false);
        setBigBranch(data);
    };
    return (
        <div>
            <div className='' style={{ backgroundImage: `url(${imageMaim})`, height: "450px", backgroundPosition: "center", backgroundSize: "cover" }}>
                <div style={{ height: "100%" }} className='backLinear d-flex align-items-center' >
                    <div className='me-md-5'>
                        <h1 className='display-1 text-light me-5'>מוסדות
                            <br></br>שערי ציון</h1>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up"
                data-aos-duration="3000" className='container mt-5 center' style={{height:"300px"}}>
                <h5 className=' display-6'>
                    {bigBranch.info}
                </h5>
            </div>
        </div>
    )
}
