import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { footerObj } from './footerObj';
import MapIcon from '@mui/icons-material/Map';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import { API_URL, doApiGet } from '../../../services/apiService';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Footer = () => {
  const [branchAr, setBranchAr] = useState([]);
  useEffect(() => {
    doApi();
  }, []);
  const doApi = async () => {
    const url = API_URL + `/branches/single/6416dfddc8751da037cdf8a3`;
    try {
      const data = await doApiGet(url);
      setBranchAr(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const MapComponent = () => {
    const defaultProps = {
      center: {
        lat: branchAr.map.wid,
        lng: branchAr.map.len, 
      },
      zoom: 17,
    };
    return (
      <div style={{ height: '150px', width: '100%' }}>
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
  return (
    <footer className="bg-secondary text-white text-center py-3">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 m-0 p-0">
            <h3>אודות</h3>
            <p>{branchAr.info}</p>
          </div>
          {/* <div className="col-md-3">
            <h3>לינקים</h3>
            <ul className="list-unstyled p-0 m-0">
              {footerObj.map((item, index) => (
                <li key={index}>
                  <Link className="nav-item nav-link" to={item.link}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          <div className="col-md-4">
            <h3>צור קשר</h3>
            <ul className="list-unstyled p-0 m-0">
              <li>
                <a href={`https://goo.gl/maps/TrstXzAVEvQa9JSn8`}>{branchAr.address}</a>
                <MapIcon />
              </li>
              <li>
                <a href={`tel:${branchAr.phone}`}>{branchAr.phone}</a>
                <LocalPhoneIcon />
              </li>
              <li>
                <a href={`mailto:${branchAr.email}`}>{branchAr.email}</a>
                <MarkAsUnreadIcon />
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <MapComponent />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr />
            <p className="text-center">© 2023 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

