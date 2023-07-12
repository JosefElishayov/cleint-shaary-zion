import { useEffect, useState } from "react";
import Slider from "react-slick";
import { API_URL, doApiGet } from "../../../services/apiService";
import { Button, Card } from "antd";
import { settings } from "./objDonations";
import { useNavigate } from "react-router-dom";

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
        <div id="donation" className="container-fluid  bg-body-tertiary py-4">
        <div className="container text-center" >
          <h2>תרומות</h2>
          <Slider {...settings}>
            {arDonations.map((item) => (
              <div key={item._id}>
                <Card 
                style={{width:"90%"}}
                  hoverable                 
                  cover={<img alt="example" src={item.img_url} width={150} height={200}/>}
                >
                  <Meta className="display-5 position-relative"  title={item.donations_Name} description={<strong> {item.price}{shekel}</strong>}  />
                  <Button onClick={()=>{nav('/donationSingle/' + item.donations_Name); window.location.reload()}} className="bg-danger text-dark-emphasis m-4">לתרומה</Button>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        </div>
      );
      

}