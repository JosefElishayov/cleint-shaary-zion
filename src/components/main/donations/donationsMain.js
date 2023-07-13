import { useEffect, useState } from "react";
import Slider from "react-slick";
import { API_URL, doApiGet } from "../../../services/apiService";
import { Button, Card } from "antd";
import { settings } from "./objDonations";
import { useNavigate } from "react-router-dom";
import { backgroundPage, textColor } from '../branches/styleMuiBranch';

const { Meta } = Card;

export default function DonationsMain() {
    const nav = useNavigate()
    const [arDonations, setArDonations] = useState([])
    useEffect(() => {
        doApi()
    }, []) 
    const doApi = async () => {
        const url = API_URL + `/donations`;
        try {
            const data = await doApiGet(url);
            setArDonations(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const shekel = "₪";
      return (
        <div  className="container-fluid  bg-body-tertiary py-4 my-5">
        <div className="container text-center" >
          <h2 className="display-3 my-5">תרומות</h2>
          <Slider {...settings}>
            {arDonations.map((item) => (
              <div className="p-0" key={item._id}>
                <Card 
                style={{width:"90%"}}
                  hoverable                 
                  cover={<img alt="example" src={item.img_url} width={150} height={200}/>}
                >
           
                   <Meta className="display-5 position-relative"  title={item.donations_Name} description={<strong> {item.price}{shekel}</strong>}  />
                  <Button style={{background:backgroundPage,color:textColor}} onClick={()=>{nav('/donationSingle/' + item.donations_Name); window.location.reload()}} className=" m-4">לתרומה</Button>
                </Card> 
              </div>
            ))}
          </Slider>
        </div>
        </div>
      );
      

}